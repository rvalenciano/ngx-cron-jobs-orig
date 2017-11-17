import { FrequencyOld } from './contracts';
import { CronConfig } from './contracts';
export interface CronComponent {
    cronService: any;
    cronJobConfig: CronConfig;
    cronJobSyntax: String;
    previousFrequency: FrequencyOld;
    _selectedBase: Number;
    _selectedDay: number[];
    _selectedHour: number[];
    _selectedDayOfMonth: number[];
    _selectedMonth: number[];
    _selectedMinutes: number[];
    frequency: FrequencyOld;
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
