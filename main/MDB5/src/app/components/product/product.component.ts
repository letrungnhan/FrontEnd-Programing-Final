import {Component, AfterViewInit, NgZone, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  mode = window.innerWidth >= 1400 ? 'side' : 'over';
  hidden = window.innerWidth >= 1400 ? false : true;
  options = [
    {value: '1', label: 'C#'},
    {value: '2', label: 'C++'},
    {value: '3', label: 'Java'},
    {value: '4', label: 'PHP'},
    {value: '5', label: 'Python'},
    {value: '6', label: 'HTML & CSS'},

  ];

  constructor(private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize').subscribe(() => {
        if (window.innerWidth < 1400 && this.mode !== 'over') {
          this.ngZone.run(() => {
            this.mode = 'over';
            this.hideSidenav();
          });
        } else if (window.innerWidth >= 1400 && this.mode !== 'side') {
          this.ngZone.run(() => {
            this.mode = 'side';
            this.showSidenav();
          });
        }
      });
    });
  }

  hideSidenav() {
    setTimeout(() => {
      this.sidenav.hide();
    }, 0);
  }

  showSidenav() {
    setTimeout(() => {
      this.sidenav.hide();
    });
  }
}
