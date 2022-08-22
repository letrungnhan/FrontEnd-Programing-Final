import {Component, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {ProductService} from "../../../service/product-service/product.service";
import {CommonService} from "../../../service/common.service";
import {Products} from "../../../service/product-service/Products";
import {CartService} from "../../../service/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DataSource} from "@angular/cdk/collections";
import {FormControl, FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

export interface Filters {
  [key: string]: string | null;

  JAVA: string | null;
  CSHARP: string | null;

}

@Component({
  selector: 'app-product',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  public dataProduct: any;
  arrays: any;
  dataLanguage: any;
  dataIndustry: any;
  dataTag: any;
  Search: any;
  searchText: string = "";
  show = false;
  config: any;
  POST: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 13;
  tableSizes: any = [5, 10, 15, 20];
  public filterCategory: any;
  apiRespone: any;
  public filteredItems$: any;
  filtersGroup: FormGroup;
  defaultFilters: Filters = {
    JAVA: null,
    CSHARP: null,
    HTML: null,
    PYTHON: null,
    PHP: null,
    JAVASCRIPT: null,
    NET: null,
    CSS: null,

  };

  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    private cartService: CartService,
    private activatedRouter: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.filtersGroup = new FormGroup({
      JAVA: new FormControl(),
      CSHARP: new FormControl(),
      HTML: new FormControl(),
      PYTHON: new FormControl(),
      PHP: new FormControl(),
      JAVASCRIPT: new FormControl(),
      NET: new FormControl(),
      CSS: new FormControl()

    });
    this.filteredItems$ = this.filtersGroup.valueChanges.pipe(
      startWith(this.defaultFilters),
      map((controls: Filters) => {
        let products = this.dataProduct;
        const languageName = Object.keys(controls).filter(
          (control) => controls[control])
        if (languageName.length > 0) {
          products = products.filter((product: { languageName: string[]; }) =>
            languageName.some((checkboxLang) => product['languageName'].some((languageName) => languageName.includes(checkboxLang))));
        }
        return products;
      })
    )
  }

  ngOnInit()
    :
    void {
    this.getLastCategory();
    this.getLastTag();
    this.getLastIndustry();
    this.getLastProduct();
    this.getArrays();
    this.productService.getProducts().subscribe(res => {
      this.filterCategory = res;
    })

    console.log(this.dataProduct)
    this.productService.search.subscribe((value: any) => {
      this.searchText = value;
    })
  }

  checkProductTitle(product: Products, params: any) {
    return product?.title.toLowerCase().includes(params.get('searchTerm') || '');
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
    console.log(this.searchText);

  }

  clearFilters() {
    // @ts-ignore
    this.filtersGroup.reset();
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
          console.log(this.dataProduct)
        }
      }
    }
  }

  showLoader(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 5000);

  }

  hideLoader(): void {
    setTimeout(() => {
      this.show = false;
    }, 6000)

  }

  pageChange(newPage: number) {
    this.router.navigate(['/product-list'], {queryParams: {page: newPage}});
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getLastProduct();
    window.scroll(0, 0);

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.valueChange
    console.log(this.tableSize)
    this.page = 1;
    this.getLastProduct();

  }

  search(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.productService.search.next(this.searchText);

  }

  filterData($event: any) {
    this.dataProduct.filter = $event.target.value;

  }

  onChange2($event: any) {
    let filteredData = this.dataProduct.filter(this.apiRespone, (item: { _languageName: string[] }) => {
      return item._languageName.includes($event.value.toLowerCase());
    })
    // @ts-ignore
    this.dataProduct = new DataSource(filteredData);
    console.log(this.dataProduct);

  }


}

