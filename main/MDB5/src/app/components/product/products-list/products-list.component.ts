import {Component, AfterViewInit, NgZone, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {ProductService} from "../../../service/product-service/product.service";
import {Products} from "../../../service/product-service/Products";
import {Category} from "../../../service/category-service/Category";
import {CategoryService} from "../../../service/category-service/category.service";
import {CommonService} from "../../../service/common.service";
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {anySymbolName} from "@angular/core/schematics/migrations/typed-forms/util";


@Component({
  selector: 'app-product',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  filtersGroup: FormGroup;
  filteredItems$: Observable<Product[]>;
  dataCategory: any;
  dataProduct: any;


  defaultFilters: Filters = {
    JAVA: null,
    CSHARP: null,
    HTMLvCSS: null,
    PYTHON: null,
    PHP: null,
    JAVASCRIPT: null,
    NET: null
  };

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private commonService: CommonService) {
    this.filtersGroup = new FormGroup({
      JAVA: new FormControl(),
      CSHARP: new FormControl(),
      PYTHON: new FormControl(),
      PHP: new FormControl(),
      JAVASCRIPT: new FormControl(),
      NET: new FormControl(),
    });

    this.filteredItems$ = this.filtersGroup.valueChanges.pipe(
      startWith(this.defaultFilters),
      map((controls: Filters) => {
        let dataProducts = this.dataProduct;
        const categories = Object.keys(controls).filter(
          (control) => controls[control] && !control.startsWith('sale')
        );
        if (categories.length > 0) {
          dataProducts = dataProducts.filter((dataProducts: { categoryID: string; }) => categories.some((category) => dataProducts.categoryID === category));
        }
        return dataProducts;
      })
    );
  }


  ngOnInit(): void {
    this.getLastCategory();
    this.getLastProduct();

  }

  getLastCategory() {
    this.commonService.listAllCategory().subscribe(
      (response) => {
        this.dataCategory = response;
      }
    )
  }

  getLastProduct() {
    this.commonService.listAllProduct().subscribe(
      (res) => {
        this.dataProduct = res;
      }
    )
  }


}

export interface Product {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  author: string;
  rating: number;
  categoryID: string;
}

export interface Filters {
  [key: string]: string | null;
  JAVA: string | null;
  CSHARP: string | null;
  HTMLvCSS: string | null;
  PYTHON: string | null;
  PHP: string | null;
  JAVASCRIPT: string | null;
  NET: string | null;
}
