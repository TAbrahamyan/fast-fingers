import { Component } from '@angular/core';

import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: [ './info.component.less' ]
})

export class InfoComponent {
  constructor(public resultService: ResultService) { }
}
