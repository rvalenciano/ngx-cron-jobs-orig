import { Component } from '@angular/core';
import { CronConfig } from '../lib/contracts/contracts';

@Component({
  selector: 'cron-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cron';

  // freq = '35 4 4 3 *';
  freq = '0 20 3 2 3 ?';
  // freq = '';
  // freqSec = '35 4 4 3 *';
  freqSec = '0 20 3 2 3 ?';
  // freqSec = '';

  cronConfig: CronConfig = {
    multiple: true,
    quartz: true,
    bootstrap: true
  };

  reset() {
    this.freq = '';
    this.freqSec = '';
  }

  set() {
    this.freq = '35 4 4 3 *';
    this.freqSec = '35 4 4 3 *';
  }

  toggleService() {
    this.cronConfig = {
      ...this.cronConfig,
      quartz: !this.cronConfig.quartz
    };
    console.log(this.cronConfig);
  }
  toggleBootstrap() {
    this.cronConfig = {
      ...this.cronConfig,
      bootstrap: !this.cronConfig.bootstrap
    };
    console.log(this.cronConfig);
  }

}
