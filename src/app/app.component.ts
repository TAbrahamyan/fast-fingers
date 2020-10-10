import { Component, OnInit } from '@angular/core';
import { wordList } from 'random-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(wordList.slice(0, 400).sort(() => Math.random() - 0.5));
  }
}
