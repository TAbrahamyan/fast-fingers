import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.less' ]
})

export class GameComponent {
  timer: number = 60;
  interval: ReturnType<typeof setInterval>;

  get formatTimer(): string {
    return new Date(this.timer * 1000).toISOString().substr(14, 5);
  }

  resetGameHandler(): void {
    this.timer = 60;
    clearInterval(this.interval);
  }

  startTypingHandler(): void {
    this.interval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
