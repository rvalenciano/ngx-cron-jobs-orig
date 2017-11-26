[![Build Status](https://travis-ci.org/rvalenciano/ngx-cron-jobs.svg?branch=master)](https://travis-ci.org/rvalenciano/ngx-cron-jobs) [![Maintainability](https://api.codeclimate.com/v1/badges/dc6b973320992074a560/maintainability)](https://codeclimate.com/github/rvalenciano/ngx-cron-jobs/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/dc6b973320992074a560/test_coverage)](https://codeclimate.com/github/rvalenciano/ngx-cron-jobs/test_coverage)

# ngx-cron-jobs

Angular > 2 version of angular-cron-jobs (http://angular-cron-jobs.github.io/angular-cron-jobs)

## Installation

To install this library, run:

```bash
$ npm install ngx-cron-jobs --save
```

```bash
$ yarn add ngx-cron-jobs
```

## Consuming your library


and then from your Angular `AppModule`:

```typescript
import { CronJobsModule } from 'ngx-cron-jobs';

@NgModule({
  imports: [
    ...,
    CronJobsModule,
    ...
  ]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- To insert to in your component minimal config with ngModel -->
<cron-jobs [(ngModel)]="hero.frequency"></cron-jobs>

<!-- To insert to in your component minimal config with reactive forms -->
<cron-jobs [formControl]="freqControl"></cron-jobs>

<!-- To insert to in your component minimal config with reactive forms -->
<!-- additional parameters -->
<cron-jobs [formControl]="freqControl" [config]="cronConfig"  [validate]="cronValidate"></cron-jobs>
```

## Configuration:

The component takes an attribute of `config`

### Options


## Development


## License

MIT © [Daniel 'yp2' Derezinski](https://github.com/yp2)

## Contributors

From angular 1 project

[@wowo](https://github.com/wowo)

[@immertreu](https://github.com/immertreu)

[@TSteele27](https://github.com/TSteele27)

[@DmitryEfimenki](https://github.com/DmitryEfimenko)

From angular2-cron-jobs project

[@rvalenciano](https://github.com/rvalenciano)

From ngx-cron-jobs project

[Daniel 'yp2' Derezinski](https://github.com/yp2)
