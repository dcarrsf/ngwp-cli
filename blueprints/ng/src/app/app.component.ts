import { Component } from '@angular/core';
import { ApiService } from './shared/services';

// External CSS
import '../style/app.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;

  constructor(private api: ApiService) {
    this.title = this.api.title;
  }
}
