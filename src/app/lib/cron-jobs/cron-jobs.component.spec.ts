import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CronJobsComponent } from './cron-jobs.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as fixtures from '../fixture.spec';
import { Injector } from '@angular/core';
import { PosixService } from '../services/posix.service';
import { QuartzService } from '../services/quartz.service';
import { DataService } from '../services/data.service';
import { cold } from 'jasmine-marbles';

fdescribe('CronJobsComponent', () => {
  let component: CronJobsComponent;
  let fixture: ComponentFixture<CronJobsComponent>;

  class PosixServiceStub {
    fromCron () {}
    setCron () {}
  }

  class QuartzServiceStub {
    fromCron () {}
    setCron () {}
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CronJobsComponent ],
      providers: [
        Injector,
        {
          // provide: PosixService,
          useClass: PosixServiceStub,
        },
        {
          provide: QuartzService,
          useClass: QuartzServiceStub
        },
        DataService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create from group on creation', () => {
    const expected = ['baseFrequency', 'daysOfWeek', 'daysOfMonth', 'months', 'hours', 'minutes'];

    expect(Object.keys(component.cronJobsForm.controls)).toEqual(expected);
  });

  it('should set config on creation', () => {
    expect(component.config).toEqual(fixtures.defaultConfig);
  });

  it('should set validation config on creation', () => {
    expect(component.validate).toEqual(fixtures.defaultValidateConfig);
  });

  xit('should set cronService to PosixService on creation', () => {
    // expect(component.cronService).toEqual(jasmine.any(PosixService));
  });

  it('should create baseFrequency$ on init', () => {
    const expected = cold('a', {a: 1});

    component.cronJobsForm.patchValue({baseFrequency: 1});
    fixture.detectChanges();

    expect(component.baseFrequency$).toBeObservable(expected);
  });
});
