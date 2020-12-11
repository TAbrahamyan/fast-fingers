import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { wordList } from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.less' ]
})

export class AppComponent {
  wordsData: { word: string; status: string }[] = [];
  enteredText: string  = '';
  timer: number = 60;
  current: number = 0;
  wordsCount: number = 0;
  correctWords: number = 0;
  incorrectWords: number = 0;
  wordsRowCount: number[] = [];
  interval: ReturnType<typeof setInterval>;

  @ViewChildren('wordsRef') wordsRef: QueryList<ElementRef>;

  ngOnInit(): void {
    const words: string[] = wordList
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.random() * (400 - 350) + 350 | 1);

    this.wordsData = words.map(word => ({ word, status: 'pending' }));
    this.wordsCount = this.wordsData.length;
  }

  checkWordsHandler(e: any): void {
    if (e.keyCode === 32) {
      this.compare();
      this.wordsData[this.current].word === this.enteredText.trim() ? this.correctWords++ : this.incorrectWords++;
      this.current += 1;

      if (this.current === this.wordsRowCount[0]) {
        this.wordsData.splice(0, this.current);
        this.wordsRowCount.shift();
        this.current = 0;
      }

      this.enteredText = '';
    }
  }

  startTypingHandler(): void {
    this.wordsRowCount = this.wordsRef
      .reduce((acc, n) => (
        (!acc.length || acc[acc.length - 1][0] !== n.nativeElement.offsetTop) && acc.push([ n.nativeElement.offsetTop, 0 ]),
        acc[acc.length - 1][1]++,
        acc
      ), [])
      .map(n => n[1]);

    this.interval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resetGameHandler(): void {
    window.location.reload();
  }

  compare(): void {
    if (this.wordsData[this.current].word === this.enteredText.trim()) {
      this.wordsData[this.current].status = 'correct';
    } else {
      this.wordsData[this.current].status = 'incorrect';
    }
  }

  get formatTimer(): string {
    return new Date(this.timer * 1000).toISOString().substr(14, 5);
  }
}
