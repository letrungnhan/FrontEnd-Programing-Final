import {Component, OnInit, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from "mdb-angular-ui-kit/sidenav";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ProductService} from "../../../service/product-service/product.service";
import {CommonService} from "../../../service/common.service";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  filtersGroup: FormGroup;
  filteredItems$: Observable<Product[]>;
  dataLanguage: any;
  dataProduct: any;
  dataIndustry: any;
  dataTag: any;

  defaultFilters: Filters = {
    JAVA: null,
    CSHARP: null,
    HTML: null,
    CSS: null,
    PYTHON: null,
    PHP: null,
    JAVASCRIPT: null,
    NET: null,
    checked: null
  };


  constructor(private productService: ProductService,
              private commonService: CommonService) {
    this.filtersGroup = new FormGroup({})


    this.filtersGroup = new FormGroup({
      JAVA: new FormControl(),
      CSHARP: new FormControl(),
      HTML: new FormControl(),
      CSS: new FormControl(),
      PYTHON: new FormControl(),
      PHP: new FormControl(),
      JAVASCRIPT: new FormControl(),
      NET: new FormControl(),
    });
    {

      this.filteredItems$ = this.filtersGroup.valueChanges.pipe(
        startWith(this.defaultFilters),
        map((controls: Filters) => {
          let dataProducts = this.dataProduct;
          const languages = Object.keys(controls)
            .filter((control) => controls[control])
            .map((languages) => String(languages)
            );
          if (languages.length > 0) {
            dataProducts = dataProducts.filter((dataProducts: { languageName: string[] }) => languages.some((language) => dataProducts.languageName.includes(language.trim().toUpperCase().toString())));
          } else {
            return this.dataProduct;
          }
          return dataProducts;

        })
      );

    }


  }

  ngOnInit(): void {
    this.getLastCategory();
    this.getLastProduct();
    this.getLastTag();
    this.getLastIndustry();


  }

  getLastCategory() {
    this.commonService.listAllLanguage().subscribe(
      (response) => {
        this.dataLanguage = response;
        console.log(this.dataLanguage);
      }
    )
  }

  getLastProduct() {
    this.commonService.listAllProduct().subscribe(
      (res) => {
        this.dataProduct = res;
        console.log(this.filteredItems$);
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
}

export interface Product {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  author: string;
  rating: number;
  languageName: string[];
  industryName: string;
  tagName: string;
}

export interface Filters {
  [key: string]: string | null;

  JAVA: string | null;
  CSHARP: string | null;
  HTML: string | null;
  CSS: string | null;
  PYTHON: string | null;
  PHP: string | null;
  JAVASCRIPT: string | null;
  NET: string | null;
  checked: string | null;
}
