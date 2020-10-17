import { Component } from '@angular/core';

import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: [ './result.component.less' ]
})

export class ResultComponent {
  constructor(public resultService: ResultService) { }
}
