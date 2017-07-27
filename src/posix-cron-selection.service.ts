import { Injectable } from '@angular/core';

import { Frequency } from './frequency';
import { BaseFrequency } from './base-frequency';

@Injectable()
export class PosixCronSelectionService {
    protected baseFrequency: BaseFrequency;  // URL to web api
    frequency: Frequency;

    constructor() {
        this.setDefaultFrequency();
        this.baseFrequency = {
            minute: 1,
            hour: 2,
            day: 3,
            week: 4,
            month: 5,
            year: 6
        }
    }

    getFrequency(): Frequency {
        return this.frequency;
    }

    getBaseFrequency(): Object {
        return this.baseFrequency;
    }
    setDefaultFrequency(): void {
        this.frequency = {
            base: 1,
            minuteValues: [],
            hourValues: [],
            dayOfMonthValues: [],
            dayValues: [],
            monthValues: []
        };
    }

    setCron(newValue: Frequency) {
        const cron = ['*', '*', '*', '*', '*'];
        if (newValue && newValue.base && newValue.base >= this.baseFrequency.hour) {
            cron[0] = newValue.minuteValues.length > 0 ? newValue.minuteValues[0].toString() : '*';
        }

        if (newValue && newValue.base && newValue.base >= this.baseFrequency.day) {
            cron[1] = newValue.hourValues.length > 0 ? newValue.hourValues[0].toString() : '*';
        }

        if (newValue && newValue.base && newValue.base === this.baseFrequency.week) {
            cron[4] = newValue.dayValues[0].toString();
        }

        if (newValue && newValue.base && newValue.base >= this.baseFrequency.month) {
            cron[2] = newValue.dayOfMonthValues.length > 0 ? newValue.dayOfMonthValues[0].toString() : '*';
        }

        if (newValue && newValue.base && newValue.base === this.baseFrequency.year) {
            cron[3] = newValue.monthValues.length > 0 ? newValue.monthValues[0].toString() : '*';
        }
        return cron.join(' ');
    }

    public fromCron(value: String, allowMultiple: Boolean): Frequency {
        let cron = value.replace(/\s+/g, ' ').split(' ');
        let tempArray = [];
        this.setDefaultFrequency();

        if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            this.frequency.base = this.baseFrequency.minute; // every minute
        } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            this.frequency.base = this.baseFrequency.hour; // every hour
        } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            this.frequency.base = this.baseFrequency.day; // every day
        } else if (cron[2] === '*' && cron[3] === '*') {
            this.frequency.base = this.baseFrequency.week; // every week
        } else if (cron[3] === '*' && cron[4] === '*') {
            this.frequency.base = this.baseFrequency.month; // every month
        } else if (cron[4] === '*') {
            this.frequency.base = this.baseFrequency.year; // every year
        }
        if (cron[0] !== '*') {
            // preparing to handle multiple minutes
            if (allowMultiple) {
                tempArray = cron[0].split(',');
                for (let i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                this.frequency.minuteValues = tempArray;
            } else {
                this.frequency.minuteValues = [+cron[0]];
            }
        }
        if (cron[1] !== '*') {
            // preparing to handle multiple hours
            if (allowMultiple) {
                tempArray = cron[1].split(',');
                for (let i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                this.frequency.hourValues = tempArray;
            } else {
                this.frequency.hourValues = [+cron[1]];
            }
        }
        if (cron[2] !== '*') {
            // preparing to handle multiple days of the month
            if (allowMultiple) {
                tempArray = cron[2].split(',');
                for (let i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                this.frequency.dayOfMonthValues = tempArray;
            } else {
                this.frequency.dayOfMonthValues = [+cron[2]];
            }
        }
        if (cron[3] !== '*') {
            // preparing to handle multiple months
            if (allowMultiple) {
                tempArray = cron[3].split(',');
                for (let i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                this.frequency.monthValues = tempArray;
            } else {
                this.frequency.monthValues = [+cron[3]];
            }
        }
        if (cron[4] !== '*') {
            // preparing to handle multiple days of the week
            if (allowMultiple) {
                tempArray = cron[4].split(',');
                for (let i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                this.frequency.dayValues = tempArray;
            } else {
                this.frequency.dayValues = [+cron[4]];
            }
        }
        return this.frequency;
    }


}
