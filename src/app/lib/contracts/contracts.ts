export interface CronJobsBaseFrequency {
  none: number;
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface CronJobsConfig {
  quartz?: boolean;
  multiple?: boolean;
  bootstrap?: boolean;
}

export interface CronJobsFrequency {
  baseFrequency: number;
  minutes: Array<number>;
  hours: Array<number>;
  daysOfMonth: Array<number>;
  daysOfWeek: Array<number>;
  months: Array<number>;
}

export interface CronJobsSelectOption {
  value: number;
  label: string | number;
}

export interface CronJobsValidationConfig {
  validate?: boolean;
}
