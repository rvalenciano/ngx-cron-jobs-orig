import { Frequency } from './frequency';
import { CronConfig } from './cron-config';
export interface CronComponent {
    cronService: any;
    cronJobConfig: CronConfig;
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
}
