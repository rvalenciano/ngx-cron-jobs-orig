import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CronJobsComponent } from './cron-jobs.component';
import { PosixOldService } from './services/posix-old.service';
import { QuartzOldService } from './services/quartz-old.service';
import { CronJobsSelectComponent } from './cron-jobs-select/cron-jobs-select.component';
import { DataService } from './services/data.service';
import { PosixService } from './services/posix.service';
import { QuartzService } from './services/quartz.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CronJobsComponent,
    CronJobsSelectComponent
  ],
  exports: [
    CronJobsComponent,
    CronJobsSelectComponent
  ],
  providers: [
    PosixOldService,
    PosixService,
    QuartzOldService,
    QuartzService,
    DataService,
  ]
})
export class CronJobsModule {
}
