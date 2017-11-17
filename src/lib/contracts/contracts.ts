export interface BaseFrequency {
  none: number;
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface CronConfig {
  quartz?: boolean;
  multiple?: boolean;
  bootstrap?: boolean;
}

export interface FrequencyOld {
  base: number;
  minuteValues: Array<number>;
  hourValues: Array<number>;
  dayOfMonthValues: Array<number>;
  monthValues: Array<number>;
  dayValues: Array<number>;
}

export interface Frequency {
  baseFrequency: number;
  minutes: Array<number>;
  hours: Array<number>;
  daysOfMonth: Array<number>;
  daysOfWeek: Array<number>;
  months: Array<number>;
}

export interface SelectOption {
  value: number;
  label: string | number;
}
