import {Component, AfterViewInit, NgZone, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {fromEvent} from 'rxjs';
import {ProductService} from "../../service/product-service/product.service";
import {Products} from "../../service/product-service/Products";

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

  constructor(private productService: ProductService) {
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  columns = ["Product ID", "title", "Category", "Description", "Author", "Price"];
  index = ["id", "title", "category", "description", "author", "price"]
  products: Products[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log("Error Occured:" + error)
      }
    )
  }
}
