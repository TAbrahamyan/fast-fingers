import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ResultService {
  timer: number = 60;
  correctWords: number = 0;
  incorrectWords: number = 0;
}
