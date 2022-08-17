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
export class ProductComponent {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  mode = window.innerWidth >= 1400 ? 'side' : 'over';
  hidden = window.innerWidth >= 1400 ? false : false;
  languages = [
    {value: '1', label: 'C#'},
    {value: '2', label: 'C++'},
    {value: '3', label: 'Java'},
    {value: '4', label: 'PHP'},
    {value: '5', label: 'Python'},
    {value: '6', label: 'HTML & CSS'},

  ];
  category = [
    {value: '1', label: 'Web'},
    {value: '2', label: 'Data'},
    {value: '3', label: 'Software Services'},
    {value: '4', label: 'Android'},
    {value: '5', label: 'Content'},

  ];


  constructor(private productService: ProductService) {
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
