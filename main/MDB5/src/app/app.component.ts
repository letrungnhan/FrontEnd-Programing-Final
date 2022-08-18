import {Component, OnInit} from '@angular/core';
import {ProductService} from "./service/product-service/product.service";
import {Products} from "./service/product-service/Products";

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

}
