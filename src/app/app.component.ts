import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Filip';
  shouldShowName = true;
  someValues = [1, 2, 3, 4];
}
