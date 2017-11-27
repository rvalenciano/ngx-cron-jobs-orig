import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CronJobsComponent } from './cron-jobs.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as fixtures from '../fixture.spec';
import { Component, Injector } from '@angular/core';
import { PosixService } from '../services/posix.service';
import { QuartzService } from '../services/quartz.service';
import { DataService } from '../services/data.service';
import { cold } from 'jasmine-marbles';
import { CronJobsConfig, CronJobsValidationConfig } from '../contracts/contracts';
import { By } from '@angular/platform-browser';

@Component({
  template:
      `
    <cron-jobs [formControl]="freqControl" [config]="cronConfig" [validate]="cronValidate"></cron-jobs>
  `
})
class TestReactiveComponent {

  freqControl: FormControl;
  freqSec = '';
  freqToSet = '';

  cronConfig: CronJobsConfig = {
    multiple: false,
    quartz: false,
    bootstrap: true
  };

  cronValidate: CronJobsValidationConfig = {
    validate: true
  };

  constructor() {
    this.freqControl = new FormControl();
    this.freqControl.valueChanges
      .subscribe(value => {
        // console.log('chahged', value);
        this.freqSec = value;
      });
  }

  set(value: string) {
    this.freqToSet = value;
    this.setControl();
  }

  setControl() {
    this.freqControl.setValue(this.freqToSet);
  }
}

fdescribe('CronJobsComponent', () => {
  let testComponent: TestReactiveComponent;
  let testFixture: ComponentFixture<TestReactiveComponent>;
  let component: CronJobsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestReactiveComponent, CronJobsComponent],
      providers: [DataService, PosixService, QuartzService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestReactiveComponent);
    testComponent = testFixture.componentInstance;
    component = testFixture.debugElement.query(By.css('cron-jobs')).componentInstance;
  });

  it('should create', () => {
    testFixture.detectChanges()
    expect(testComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should create from group on creation', () => {
    const expected = ['baseFrequency', 'daysOfWeek', 'daysOfMonth', 'months', 'hours', 'minutes'];
    testFixture.detectChanges();
    expect(Object.keys(component.cronJobsForm.controls)).toEqual(expected);
  });

  it('should set config on creation', () => {
    testFixture.detectChanges();
    expect(component.config).toEqual(testComponent.cronConfig);
  });

  it('should set default config on creation when no config is passed', () => {
    testFixture.detectChanges();

    testComponent.cronConfig = undefined;

    testFixture.detectChanges();

    expect(component.config).toEqual(fixtures.defaultConfig);
  });

  it('should set validation config on creation', () => {
    testFixture.detectChanges();
    expect(component.validate).toEqual(testComponent.cronValidate);
  });

  it('should set default validation config on creation when no config is passed', () => {
    testFixture.detectChanges();

    testComponent.cronValidate = undefined;

    testFixture.detectChanges();

    expect(component.validate).toEqual(fixtures.defaultValidateConfig);
  });

  it('should set service on service change', () => {
    testFixture.detectChanges();

    const spy = spyOn(component, 'setService').and.callThrough();

    testComponent.cronConfig = {
      ...testComponent.cronConfig,
      quartz: true,
    };

    testFixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should create config on config change', () => {
    testFixture.detectChanges();

    const expected = {
      multiple: true,
      quartz: true,
      bootstrap: false
    };

    testComponent.cronConfig = {
      ...expected
    };

    testFixture.detectChanges();

    expect(component.config).toEqual(expected);
  });

  it('should create validation config on config change', () => {
    testFixture.detectChanges();

    const expected = {
      validate: false
    };

    testComponent.cronValidate = {
      ...expected
    };

    testFixture.detectChanges();

    expect(component.validate).toEqual(expected);
  });

  it('should set Posix service on setService call when config.quartz is false', fakeAsync(() => {
    testFixture.detectChanges();

    tick();
    component.cronJobsForm.get('baseFrequency').setValue('1');
    tick();
    testFixture.detectChanges();

    expect(testComponent.freqSec).toEqual('* * * * *');
  }));

  it('should set Quartz service on setService call when config.quartz is true', fakeAsync(() => {
    testComponent.cronConfig = {
      ...testComponent.cronConfig,
      quartz: true,
    };

    testFixture.detectChanges();

    tick();
    component.cronJobsForm.get('baseFrequency').setValue('1');
    tick();
    testFixture.detectChanges();

    expect(testComponent.freqSec).toEqual('0 * * * * ?');
  }));

  it('test', fakeAsync(() => {
    const expected = cold('a', {a: 0});

    testFixture.detectChanges();
    tick();

    expect(component.baseFrequency$).toBeObservable(expected);
  }));

});
