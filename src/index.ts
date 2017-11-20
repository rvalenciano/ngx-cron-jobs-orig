import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CronSelectionComponent } from './cron-selection.component';

export * from './cron-selection.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CronSelectionComponent
  ],
  exports: [
    CronSelectionComponent
  ]
})
export class CronSelectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CronSelectionModule,
      providers: []
    };
  }
}
