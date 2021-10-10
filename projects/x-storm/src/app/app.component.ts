import { Component } from '@angular/core';
import { DataNode } from './storm-data/data-node';
import { StormDataService } from './storm-data/storm-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'X-Storm';

  constructor() {

  }
}
