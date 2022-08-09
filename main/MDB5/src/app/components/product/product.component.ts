import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title: string = "Rating Star";
  const = ["fas fa-star blue-text"];

  constructor() {
  }

  ngOnInit(): void {
  }

}
