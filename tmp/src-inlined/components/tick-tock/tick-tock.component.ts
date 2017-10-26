import { Component, OnInit } from '@angular/core';

import { TickTockService } from '../../services';

@Component({
  selector: 'tick-tock',
  styles: [`
    @import url("https://fonts.googleapis.com/css?family=Roboto:100");.tick-tock-time{font-size:2em;font-family:'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif}
  `],
  template: `
    <div class="tick-tock-time">
      Time is: {{ currentTime }}
    </div>
  `,
})
export class TickTockComponent implements OnInit {
  // Current time string.
  public currentTime: string;

  /**
   * Component constructor with injected dependencies.
   * @param tickTockService
   */
  public constructor(
    private tickTockService: TickTockService
  ) {}

  /**
   * Implements onInit event handler.
   */
  public ngOnInit(): void {
    this.tickTockService.getTick().subscribe(
      (timeString) => this.currentTime = timeString
    );
  }
}
