import { Injectable } from '@angular/core';
import { CronJobsBaseFrequency, CronJobsFrequency, CronJobsSelectOption } from '../contracts/contracts';
import { DataService } from './data.service';

@Injectable()
export class PosixService {

  public baseFrequency: CronJobsBaseFrequency;
  private frequencyData: Array<CronJobsSelectOption>;

  constructor(protected dataService: DataService) {
    this.frequencyData = this.dataService.baseFrequency;
    const keys = ['none', 'minute', 'hour', 'day', 'week', 'month', 'year'];
    const result = {};
    keys.forEach((key: string, idx: number) => {
      result[key] = this.frequencyData[idx].value;
    });
    this.baseFrequency = <CronJobsBaseFrequency>result;
  }

  public getDefaultFrequency(): CronJobsFrequency {
    return {
      baseFrequency: this.frequencyData[0].value,
      minutes: [],
      hours: [],
      daysOfMonth: [],
      daysOfWeek: [],
      months: []
    };
  }

  public fromCron(value: String): CronJobsFrequency {
    const cron = value.trim().replace(/\s+/g, ' ').split(' ');
    const frequency = this.getDefaultFrequency();

    if (cron.length !== 5) {
      return frequency;
    }

    if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
      frequency.baseFrequency = this.baseFrequency.minute; // every minute
    } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
      frequency.baseFrequency = this.baseFrequency.hour; // every hour
    } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
      frequency.baseFrequency = this.baseFrequency.day; // every day
    } else if (cron[2] === '*' && cron[3] === '*') {
      frequency.baseFrequency = this.baseFrequency.week; // every week
    } else if (cron[3] === '*' && cron[4] === '*') {
      frequency.baseFrequency = this.baseFrequency.month; // every month
    } else if (cron[4] === '*') {
      frequency.baseFrequency = this.baseFrequency.year; // every year
    }
    if (cron[0] !== '*') {
      // preparing to handle multiple minutes
      frequency.minutes = this.getValueArray(cron[0]);
    }
    if (cron[1] !== '*') {
      // preparing to handle multiple hours
      frequency.hours = this.getValueArray(cron[1]);
    }
    if (cron[2] !== '*') {
      // preparing to handle multiple daysOfWeek of the month
      frequency.daysOfMonth = this.getValueArray(cron[2]);
    }
    if (cron[3] !== '*') {
      // preparing to handle multiple months
      frequency.months = this.getValueArray(cron[3]);
    }
    if (cron[4] !== '*') {
      // preparing to handle multiple daysOfWeek of the week
      frequency.daysOfWeek = this.getValueArray(cron[4]);
    }
    return frequency;
  }

  setCron(value: CronJobsFrequency) {
    const cron = ['*', '*', '*', '*', '*'];

    if (value && value.baseFrequency ) {
      if (value.baseFrequency >= this.baseFrequency.hour) {
        cron[0] = value.minutes.length > 0 ? value.minutes.join(',') : '*';
      }

      if (value.baseFrequency >= this.baseFrequency.day) {
        cron[1] = value.hours.length > 0 ? value.hours.join(',') : '*';
      }

      if (value.baseFrequency === this.baseFrequency.week) {
        cron[4] = value.daysOfWeek.length > 0 ? value.daysOfWeek.join(',') : '*';
      }

      if (value.baseFrequency >= this.baseFrequency.month) {
        cron[2] = value.daysOfMonth.length > 0 ? value.daysOfMonth.join(',') : '*';
      }

      if (value.baseFrequency === this.baseFrequency.year) {
        cron[3] = value.months.length > 0 ? value.months.join(',') : '*';
      }
    } else {
      return '';
    }


    return cron.join(' ');
}

  public getValueArray(value: string): Array<number> {
    if (value) {
      return value.split(',').map((ele) => +ele);
    }
    return [];
  }

}
