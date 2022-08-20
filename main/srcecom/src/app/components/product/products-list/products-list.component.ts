import {Component, AfterViewInit, NgZone, ViewChild, Output, EventEmitter} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {ProductService} from "../../../service/product-service/product.service";
import {CommonService} from "../../../service/common.service";
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Products} from "../../../service/product-service/Products";
import {CartService} from "../../../service/cart.service";
import {ActivatedRoute} from "@angular/router";
import {FilterPipe} from "../../../pipes/filter.pipe";


@Component({
  selector: 'app-product',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  dataProduct: any;
  arrays: any;
  dataLanguage: any;
  dataIndustry: any;
  dataTag: any;
  Search: any;
  searchText: string = '';

  constructor(private productService: ProductService,
              private commonService: CommonService,
              private cartService: CartService,
              private activatedRouter: ActivatedRoute,
  ) {
  }

  ngOnInit()
    :
    void {
    this.getLastCategory();
    this.getLastTag();
    this.getLastIndustry();
    this.getLastProduct();
    this.getArrays();


  }


  getLastCategory() {
    this.commonService.listAllLanguage().subscribe(
      (response) => {
        this.dataLanguage = response;

      }
    )
  }

  getLastIndustry() {
    this.commonService.listAllIndustry().subscribe(
      (res) => {
        this.dataIndustry = res;
      }
    )
  }

  getLastTag() {
    this.commonService.listAllTags().subscribe(
      (res) => {
        this.dataTag = res;
      }
    )
  }

  addToCart(product: Products) {
    this.cartService.addItem(product);
  }

  //search

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;

  }

  onSearch() {
    this.Search = this.searchText;
  }

  onSearchClear() {
    this.searchText = '';
    this.Search = '';
  }

  getLastProduct() {
    this.commonService.listAllProduct().subscribe(
      (res) => {
        this.dataProduct = res;
      }
    )

  }

  getArrays() {
    this.commonService.listAllProduct().subscribe(
      (res) => {
        this.arrays = res;
        console.log(this.arrays)
      }
    )


  }

  tempArray: any = [];
  newArray: any = [];

  onChange(event: any) {
    if (event.target.checked) {
      this.tempArray = this.arrays.filter((e: { languageName: string[] }) => e.languageName.includes(event.target.value));
      this.dataProduct = [];
      this.newArray.push(this.tempArray);
      for (let i = 0; i < this.newArray.length; i++) {
        var firstArray = this.newArray[i];
        for (let i = 0; i < firstArray.length; i++) {
          let obj = firstArray[i];
          this.dataProduct.push(obj);
        }
      }
    } else {
      this.tempArray = this.dataProduct.filter((e: { languageName: string[] }) => e.languageName != (event.target.value));
      this.newArray = [];
      this.dataProduct = [];
      this.newArray.push(this.tempArray);
      for (let i = 0; i < this.newArray.length; i++) {
        let firstArray = this.newArray[i];
        for (let i = 0; i < firstArray.length; i++) {
          let obj = firstArray[i];
          this.dataProduct.push(obj);
        }
      }
    }
  }
}
