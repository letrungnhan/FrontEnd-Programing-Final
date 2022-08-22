import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Source Code Website E-Com';

  constructor() {
  }

  ngOnInit(): void {
  }

  onActive() {
    window.scroll(0, 0);
  }
}

