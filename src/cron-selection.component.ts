import { Component, OnInit, forwardRef, Input, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, SelectMultipleControlValueAccessor } from '@angular/forms';
import { PosixCronSelectionService } from './posix-cron-selection.service';
import { QuartzCronSelectionService } from './quartz-cron-selection.service';
import { Frequency } from './frequency';
import { CronComponent } from './cron.component';
import { CronConfig } from './cron-config';

declare let $: any;
@Component({
    selector: 'my-cron-selection',
    host: { '(ngModelChange)': 'ngModelValueChanged($event)' },
    templateUrl: './cron-selection.html',
    styleUrls: ['./cron-selection.component.css'],
    providers: [PosixCronSelectionService,
        QuartzCronSelectionService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CronSelectionComponent),
            multi: true,
        }],
})
export class CronSelectionComponent implements OnInit, ControlValueAccessor, CronComponent {
    @Input() cronJobConfig: CronConfig;
    cronService: any;
    cronJobSyntax: String;
    previousFrequency: Frequency;
    _selectedBase: Number;
    _selectedDay: number[];
    _selectedHour: number[];
    _selectedDayOfMonth: number[];
    _selectedMonth: number[];
    _selectedMinutes: number[];
    frequency: Frequency;
    baseFrequency: any;
    initialFrequencies: Object[];
    minuteValues: number[];
    hourValues: number[];
    dayOfMonthValues: number[];
    dayValues: number[];
    monthValues: number[];
    allowMultiple: boolean;
    cronNumeral: Object[];
    cronMonthName: Object[];
    cronDayValues: Object[];
    modelChanged: boolean;

    constructor(private injector: Injector) {
        this.cronJobSyntax = '';
        this._selectedBase = 1;
        this._selectedDay = [0];
        this._selectedHour = [1];
        this._selectedDayOfMonth = [0];
        this._selectedMonth = [1];
        this._selectedMinutes = [0];
        this.modelChanged = false;
        this.minuteValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
        this.hourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        this.dayOfMonthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        this.dayValues = [0, 1, 2, 3, 4, 5, 6];

        this.cronDayValues = [
            { value: 0, label: 'Sunday' },
            { value: 1, label: 'Monday' },
            { value: 2, label: 'Tuesday' },
            { value: 3, label: 'Wednesday' },
            { value: 4, label: 'Thursday' },
            { value: 5, label: 'Friday' },
            { value: 6, label: 'Saturday' }
        ];
        this.allowMultiple = false;
        this.monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.cronMonthName = [
            { value: 1, label: 'January' },
            { value: 2, label: 'February' },
            { value: 3, label: 'March' },
            { value: 4, label: 'April' },
            { value: 5, label: 'May' },
            { value: 6, label: 'June' },
            { value: 7, label: 'July' },
            { value: 8, label: 'August' },
            { value: 9, label: 'September' },
            { value: 10, label: 'October' },
            { value: 11, label: 'November' },
            { value: 12, label: 'December' }
        ];
        this.cronNumeral = [
            { value: 1, label: '1st' },
            { value: 2, label: '2nd' },
            { value: 3, label: '3rd' },
            { value: 4, label: '4th' },
            { value: 5, label: '5th' },
            { value: 6, label: '6th' },
            { value: 7, label: '7th' },
            { value: 8, label: '8th' },
            { value: 9, label: '9th' },
            { value: 10, label: '10th' },
            { value: 11, label: '11th' },
            { value: 12, label: '12th' },
            { value: 13, label: '13th' },
            { value: 14, label: '14th' },
            { value: 15, label: '15th' },
            { value: 16, label: '16th' },
            { value: 17, label: '17th' },
            { value: 18, label: '18th' },
            { value: 19, label: '19th' },
            { value: 20, label: '20th' },
            { value: 21, label: '21st' },
            { value: 22, label: '22nd' },
            { value: 23, label: '23rd' },
            { value: 24, label: '24th' },
            { value: 25, label: '25th' },
            { value: 26, label: '26th' },
            { value: 27, label: '27th' },
            { value: 28, label: '28th' },
            { value: 29, label: '29th' },
            { value: 30, label: '30th' },
            { value: 31, label: '31st' }
        ];
        this.initialFrequencies = [
            {
                value: 1,
                label: 'Minute'
            }, {
                value: 2,
                label: 'Hour'
            }, {
                value: 3,
                label: 'Day'
            }, {
                value: 4,
                label: 'Week'
            }, {
                value: 5,
                label: 'Month'
            }, {
                value: 6,
                label: 'Year'
            }
        ];
    }
    ngOnInit(): void {
        this.cronService = <PosixCronSelectionService>this.injector.get(PosixCronSelectionService);
        if (this.cronJobConfig.quartz) {
            this.dayValues = [1, 2, 3, 4, 5, 6, 7];
            this.cronDayValues = [
                { value: 1, label: 'Sunday' },
                { value: 2, label: 'Monday' },
                { value: 3, label: 'Tuesday' },
                { value: 4, label: 'Wednesday' },
                { value: 5, label: 'Thursday' },
                { value: 6, label: 'Friday' },
                { value: 7, label: 'Saturday' }
            ];
            this.cronService = <QuartzCronSelectionService>this.injector.get(QuartzCronSelectionService);
        }
        this.baseFrequency = this.cronService.getBaseFrequency();
        this.frequency = this.cronService.getFrequency();
        this.previousFrequency = undefined;
    }

    protected _onTouchedCallback: () => {};
    protected _onChangeCallback: (_: any) => {};

    public ngModelValueChanged(newValue) {
        if (newValue != null && newValue) {
            this.modelChanged = true;
            this.frequency = this.cronService.fromCron(newValue, this.cronJobConfig.multiple);
        } else if (newValue === '') {
            this.frequency = undefined;
        }
    }

    get selectedBase(): any {
        return this._selectedBase;
    }
    set selectedBase(value: any) {
        if (value !== this._selectedBase) {
            this.frequency.base = +value;
            this._selectedBase = +value;
            this._onChangeCallback(this.setCronJobSyntax());
        }
        this._onTouchedCallback();
    }

    get selectedHour(): any {
        return this._selectedHour;
    }

    set selectedHour(value: any) {
        if (!Array.isArray(value)) {
            value = [+value];
        } else {
            value = value.map(v => +v)
        }

        if (!this.arrayEquals(value, this._selectedHour)) {
            this.frequency.hourValues = [];
            this._selectedHour = value;
            this.frequency.hourValues = this.frequency.hourValues.concat(value);
            this._onChangeCallback(this.setCronJobSyntax());
        }

        this._onTouchedCallback();
    }

    get selectedMinutes(): any {
        return this._selectedMinutes;
    }

    set selectedMinutes(value: any) {
        if (!Array.isArray(value)) {
            value = [+value];
        } else {
            value = value.map(v => +v)
        }

        if (!this.arrayEquals(value, this._selectedMinutes)) {
            this.frequency.minuteValues = [];
            this._selectedMinutes = value;
            this.frequency.minuteValues = this.frequency.minuteValues.concat(value);
            this._onChangeCallback(this.setCronJobSyntax());
        }
        this._onTouchedCallback();
    }


    get selectedMonth(): any {
        return this._selectedMonth;
    }

    set selectedMonth(value: any) {
        if (!Array.isArray(value)) {
            value = [+value];
        } else {
            value = value.map(v => +v)
        }

        if (!this.arrayEquals(value, this._selectedMonth)) {
            this.frequency.monthValues = [];
            this._selectedMonth = value;
            this.frequency.monthValues = this.frequency.monthValues.concat(value);
            this._onChangeCallback(this.setCronJobSyntax());
        }
        this._onTouchedCallback();
    }

    get selectedDayOfMonth(): any {
        return this._selectedDayOfMonth;
    }

    set selectedDayOfMonth(value: any) {
        if (!Array.isArray(value)) {
            value = [+value];
        } else {
            value = value.map(v => +v)
        }

        if (!this.arrayEquals(value, this._selectedDayOfMonth)) {
            this.frequency.dayOfMonthValues = [];
            this._selectedDayOfMonth = value;
            this.frequency.dayOfMonthValues = this.frequency.dayOfMonthValues.concat(value);
            this._onChangeCallback(this.setCronJobSyntax());
        }
        this._onTouchedCallback();
    }

    get selectedDay(): any {
        return this._selectedDay;
    }


    set selectedDay(value: any) {
        if (!Array.isArray(value)) {
            value = [+value];
        } else {
            value = value.map(v => +v)
        }

        if (!this.arrayEquals(value, this._selectedDay)) {
            this.frequency.dayValues = [];
            this._selectedDay = value;
            this.frequency.dayValues = this.frequency.dayValues.concat(value);
            this._onChangeCallback(this.setCronJobSyntax());
        }
        this._onTouchedCallback();
    }
    //From ControlValueAccessor interface
    writeValue(value: any) {
        this._selectedBase = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
    setCronJobSyntax(): String {
        if (this.frequency.base &&
            (!this.previousFrequency || this.frequency.base != this.previousFrequency.base)
            && !this.modelChanged) {

        } else if (this.frequency &&
            this.frequency.base &&
            this.previousFrequency &&
            this.previousFrequency.base) {
            this.modelChanged = false;
        }
        this.previousFrequency = Object.assign({}, this.frequency);
        this.setInitialValuesForBase(this.frequency);
        this.cronJobSyntax = this.cronService.setCron(this.frequency);
        return this.cronJobSyntax;
    }


    setInitialValuesForBase(freq: Frequency): void {
        if (freq.base) {
            if (freq.base >= this.baseFrequency.hour && freq.minuteValues.length >= 0) {
                freq.minuteValues = this._selectedMinutes;
            }

            if (freq.base >= this.baseFrequency.day && freq.hourValues.length >= 0) {
                freq.hourValues = this._selectedHour;
            }

            if (freq.base === this.baseFrequency.week && freq.dayValues.length >= 0) {
                freq.dayValues = this._selectedDay;
            }

            if (freq.base >= this.baseFrequency.month && freq.dayOfMonthValues.length >= 0) {
                freq.dayOfMonthValues = this._selectedDayOfMonth;
            }

            if (freq.base === this.baseFrequency.year && freq.monthValues.length >= 0) {
                freq.monthValues = this._selectedMonth;
            }
        }


    }

    private arrayEquals(firstArray, secondArray) {
        if (firstArray === secondArray) { return true; }
        if (!firstArray || !secondArray) { return false; }
        if (firstArray.length != secondArray.length) { return false; }
        let equals = true;
        firstArray = firstArray.sort();
        secondArray = secondArray.sort();
        firstArray.forEach(function (element, index) {
            if (element != secondArray[index]) {
                equals = false;
                return;
            }
        });
        return equals;
    }
}
