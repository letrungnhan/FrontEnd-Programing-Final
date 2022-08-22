import {Component, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {ProductService} from "../../../service/product-service/product.service";
import {CommonService} from "../../../service/common.service";
import {Products} from "../../../service/product-service/Products";
import {CartService} from "../../../service/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


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
  notEmtyProduct = true;
  notScrolly = true;
  config: any;
  POST: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 13;
  tableSizes: any = [5, 10, 15, 20];
  public filterCategory: any;


  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    private cartService: CartService,
    private activatedRouter: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit()
    :
    void {
    this.getLastCategory();
    this.getLastTag();
    this.getLastIndustry();
    this.getLastProduct()
    this.getArrays();
    this.productService.getProducts().subscribe(res => {
      this.filterCategory = res;
    })

    this.dataProduct.forEach((a: any) => {
      if (a.languageName.includes("JAVA")) {
        a.languageName = "JAVA"
        this.arrays = [];
        this.dataProduct.push(this.arrays);
      }
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

  filter(language: any) {

    this.filterCategory = this.dataProduct.filter((a: any) => {
      if (a.languageName == language || language == '') {
        return a;
      }
    })
  }

}

