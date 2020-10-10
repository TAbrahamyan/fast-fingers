import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.less' ]
})

export class GameComponent {
  timer: number = 60;

  get formatTimer(): string {
    return new Date(this.timer * 1000).toISOString().substr(14, 5);
  }

  startTypingHandler(): void {
    const interval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
