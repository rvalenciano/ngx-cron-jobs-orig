import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronJobsComponent } from './cron-jobs.component';

describe('CronJobsComponent', () => {
  let component: CronJobsComponent;
  let fixture: ComponentFixture<CronJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronJobsComponent ]
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
});
