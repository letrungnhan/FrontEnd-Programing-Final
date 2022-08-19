import {Component, AfterViewInit, NgZone, ViewChild} from '@angular/core';
import {MdbSidenavComponent} from 'mdb-angular-ui-kit/sidenav';
import {ProductService} from "../../../service/product-service/product.service";
import {CommonService} from "../../../service/common.service";
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Products} from "../../../service/product-service/Products";


@Component({
  selector: 'app-product',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @ViewChild('sidenav', {static: true}) sidenav!: MdbSidenavComponent;
  dataLanguage: any;
  dataProduct: any;
  product: Products[] = []
  dataIndustry: any;
  dataTag: any;

  constructor(private productService: ProductService,
              private commonService: CommonService,
  ) {
  }

  ngOnInit()
    :
    void {
    this.getLastCategory();
    this.getLastTag();
    this.getLastIndustry();
    this.getLastProduct();


  }

  getLastProduct() {
    this.commonService.listAllProduct().subscribe(
      (res) => {
        this.dataProduct = res;
      }
    )
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

}
