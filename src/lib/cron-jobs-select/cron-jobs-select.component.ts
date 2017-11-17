import { Component, forwardRef, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CronConfig, Frequency, SelectOption } from '../contracts/contracts';
import { DataService } from '../services/data.service';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import { PosixService } from '../services/posix.service';
import { QuartzService } from '../services/quartz.service';

@Component({
  selector: 'cron-jobs-select',
  templateUrl: './cron-jobs-select.component.html',
  styleUrls: ['./cron-jobs-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CronJobsSelectComponent),
      multi: true
    }
  ]
})
export class CronJobsSelectComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() config: CronConfig;

  public isDisabled = false;
  public baseFrequencyData: Array<SelectOption>;
  public baseFrequency$: Observable<number>;
  public daysOfWeekData: Array<SelectOption> = [];
  public daysOfMonthData: Array<SelectOption> = [];
  public monthsData: Array<SelectOption> = [];
  public hoursData: Array<SelectOption> = [];
  public minutesData: Array<SelectOption> = [];
  public onChange: (cronValue: string) => {};

  private isPatching = false;
  private unSubscribe = new Subject();
  private cronService: PosixService;

  public cronJobsForm: FormGroup;

  constructor(private dataService: DataService,
              private injector: Injector,
              private formBuilder: FormBuilder) {

    this.cronJobsForm = this.formBuilder.group({
      baseFrequency: 0,
      daysOfWeek: '',
      daysOfMonth: '',
      months: '',
      hours: '',
      minutes: ''
    });
  }

  ngOnInit() {
    this.baseFrequency$ = this.cronJobsForm.get('baseFrequency')
      .valueChanges
      .takeUntil(this.unSubscribe)
      .map(v => +v)
      .publishReplay(1)
      .refCount();

    this.cronJobsForm.valueChanges
      .takeUntil(this.unSubscribe)
      .filter(() => !this.isPatching)
      .map((freq: Frequency) => {
        freq.baseFrequency = +freq.baseFrequency;
        return freq;
      })
      .subscribe((values: Frequency) => {
        if (!values.baseFrequency) {
          values = this.getDefaultFrequency();
          this.cronJobsForm.patchValue(values, {emitEvent: false});
        }
        this.onChange(this.cronService.setCron(values));
      });

    this.baseFrequencyData = this.dataService.baseFrequency;
    this.daysOfMonthData = this.dataService.daysOfMonth;
    this.monthsData = this.dataService.months;
    this.hoursData = this.dataService.hours;
    this.minutesData = this.dataService.minutes;

    this.isPatching = true;
    setTimeout(() => {
      this.cronJobsForm.patchValue(this.getDefaultFrequency());
      this.isPatching = false;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && changes['config'].currentValue) {
      this.config = this.dataService.getConfig(<CronConfig>changes['config'].currentValue);
      if (this.config.quartz) {
        this.cronService = this.injector.get(QuartzService);
      } else {
        this.cronService = this.injector.get(PosixService);
      }

      if (!changes['config'].previousValue ||
        changes['config'].previousValue['quartz'] !== changes['config'].currentValue['quartz']) {
        this.daysOfWeekData = this.dataService.getDaysOfWeek(this.config.quartz);
        this.cronJobsForm.patchValue({daysOfWeek: this.daysOfWeekData[0].value});
      }
    }
  }

  writeValue(cronValue: string): void {
    this.isPatching = true;
    let valueToPatch: Frequency;
    if (cronValue) {
      valueToPatch = this.cronService.fromCron(cronValue);
    } else {
      valueToPatch = this.getDefaultFrequency();
    }

    setTimeout(() => {
      this.cronJobsForm.patchValue(valueToPatch);
      this.isPatching = false;
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.isDisabled) {
      this.cronJobsForm.disable();
    } else {
      this.cronJobsForm.enable();
    }
  }

  getDefaultFrequency(): Frequency {
    const freq = this.cronService.getDefaultFrequency();
    freq.daysOfWeek = this.daysOfWeekData[0] ? [this.daysOfWeekData[0].value] : [];
    freq.daysOfMonth = this.daysOfMonthData[0] ? [this.daysOfMonthData[0].value] : [];
    freq.months = this.monthsData[0] ? [this.monthsData[0].value] : [];
    freq.hours = this.hoursData[0] ? [this.hoursData[0].value] : [];
    freq.minutes = this.minutesData[0] ? [this.minutesData[0].value] : [];

    return freq;
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

}
