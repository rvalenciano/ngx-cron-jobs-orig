import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronJobsSelectComponent } from './cron-jobs-select.component';

describe('CronJobsSelectComponent', () => {
  let component: CronJobsSelectComponent;
  let fixture: ComponentFixture<CronJobsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronJobsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronJobsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
