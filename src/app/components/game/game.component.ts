import { Component } from '@angular/core';
import { wordList } from 'random-words';

import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.less' ]
})

export class GameComponent {
  words: string[] = wordList.sort(() => Math.random() - 0.5).slice(0, 400);
  typingText: string  = '';
  delay: number = 1000;
  interval: ReturnType<typeof setInterval>;

  constructor(public resultService: ResultService) { }

  checkWordsHandler(e: any): void {
    if (e.data === ' ') {
      if (this.typingText.trim() === this.words[0]) {
        this.resultService.correctWords += 1;
      } else {
        this.resultService.incorrectWords += 1;
      }

      e.target.value = '';
      this.typingText = '';

      setTimeout(() => {
        this.words.splice(0, 1);
      }, this.delay / 2);
    }
  }

  startTypingHandler(): void {
    this.interval = setInterval(() => {
      this.resultService.timer--;

      if (this.resultService.timer <= 0) {
        clearInterval(this.interval);
      }
    }, this.delay);
  }

  resetGameHandler(): void {
    this.resultService.timer = 60;
    clearInterval(this.interval);
  }

  get formatTimer(): string {
    return new Date(this.resultService.timer * 1000).toISOString().substr(14, 5);
  }
}
