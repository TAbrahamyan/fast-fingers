import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { wordList } from 'random-words';

interface IWordsData {
  word: string;
  status: string;
}

interface IStatistics {
  current: number;
  wordsCount: number;
  writingWordsCount: number;
  correctWords: number;
  incorrectWords: number;
  wordsRowCount: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.less' ]
})

export class AppComponent {
  wordsData: IWordsData[] = [];
  enteredText: string  = '';
  isStartTyping: boolean = true;
  interval: ReturnType<typeof setInterval>;
  timer: number = 60;
  statistics: IStatistics = {
    current: 0,
    wordsCount: 0,
    writingWordsCount: 0,
    correctWords: 0,
    incorrectWords: 0,
    wordsRowCount: [],
  };

  @ViewChildren('wordsRef') wordsRef: QueryList<ElementRef>;

  ngOnInit(): void {
    const words: string[] = wordList
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.random() * (400 - 350) + 350 | 1);

    this.wordsData = words.map(word => ({ word, status: 'pending' }));
    this.statistics.wordsCount = this.wordsData.length;
  }

  checkWordsHandler(keyCode: number): void {
    if (keyCode === 32) {
      this.compare();
      this.startTyping();
      this.checkingCorrectnessWords();
    }
  }

  startTyping(): void {
    if (this.isStartTyping) {
      this.statistics.wordsRowCount = this.wordsRef
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

      this.isStartTyping = false;
    }
  }

  compare(): void {
    if (this.wordsData[this.statistics.current].word === this.enteredText.trim()) {
      this.wordsData[this.statistics.current].status = 'correct';
    } else {
      this.wordsData[this.statistics.current].status = 'incorrect';
    }
  }

  checkingCorrectnessWords(): void {
    this.wordsData[this.statistics.current].word === this.enteredText.trim() ? this.statistics.correctWords++ : this.statistics.incorrectWords++;
    this.statistics.current += 1;
    this.statistics.writingWordsCount += 1;

    if (this.statistics.current === this.statistics.wordsRowCount[0]) {
      this.wordsData.splice(0, this.statistics.current);
      this.statistics.wordsRowCount.shift();
      this.statistics.current = 0;
    }

    this.enteredText = '';
  }

  resetGameHandler(): void {
    window.location.reload();
  }

  get formatTimer(): string {
    return new Date(this.timer * 1000).toISOString().substr(14, 5);
  }
}
