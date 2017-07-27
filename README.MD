# angular2-cron-jobs

Angular 2 version of angular-cron-jobs (http://angular-cron-jobs.github.io/angular-cron-jobs)

## Installation

To install this library, run:

```bash
$ npm install angular2-cron-jobs --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install angular2-cron-jobs
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CronSelectionModule } from 'angular2-cron-jobs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<my-cron-selection [(ngModel)]="hero.frequency" [cronJobConfig]="cronJobConfig" ngDefaultControl></my-cron-selection>
```

Where ngModel is the property to save the crojob syntax, and cronJobConfig is a variable added to the parent component with different properties to the object.
So, for example, in parent component I have:

```typescript
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  cronJobConfig: Object;
  
```

And in the mode where I'm gonna store the syntax:

```typescript
export class Hero {
  id: number;
  name: string;
  frequency: string;
}
```

For example, a job selected to run every month on the 11th at 4:10 AM would output the follow:

    '10 4 11 * *'

as a string.

## Configuration:

The directive takes an attribute of `config`

```html
  <my-cron-selection [(ngModel)]="hero.frequency" [cronJobConfig]="cronJobConfig" ngDefaultControl></my-cron-selection>
```    
### Options

This is an object in your controller you can use to remove options from the user.  For example if you would like the user to be able to set Minute, Hour, and Day but not Week, Month, and Year you would create the following object in your controller:

Currently, from the angular 1 project, only quartz syntax option is available. Currently working to add other config options.


How you initialize the object? In parent component:

```typescript
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
    this.cronJobConfig = {
      quartz: true
    };
  }

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Randall Valenciano Fallas](mailto:ravf.226@gmail.com)

## Contributors

From angular 1 project

[@wowo](https://github.com/wowo)

[@immertreu](https://github.com/immertreu)

[@TSteele27](https://github.com/TSteele27)

[@DmitryEfimenki](https://github.com/DmitryEfimenko)

From angular 2 project

[@rvalenciano](https://github.com/rvalenciano)


