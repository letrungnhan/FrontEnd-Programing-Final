import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {DetailsModalComponent} from "../../../modal/details-modal/details-modal.component";
import {CommonService} from "../../../service/common.service";
import {ActivatedRoute} from "@angular/router";
import {Products} from "../../../service/product-service/Products";
import {CartService} from "../../../service/cart.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailComponent implements OnInit {
  modalRef: MdbModalRef<DetailsModalComponent> | null = null;
  id: any;
  price: any;
  itemProduct: any;

  constructor(private modalService: MdbModalService, private commonService: CommonService,
              private activatedRouter: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      }
    );
    this.getProductByID(this.id);


    throw new Error('Method not implemented.');
  }

  getProductByID(id: any) {
    this.commonService.getProductByID(id).subscribe(
      (res) => {
        this.itemProduct = res;

        console.log(this.itemProduct)
      }
    )

  }




  openModal() {
    this.modalRef = this.modalService.open(DetailsModalComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }

  addToCart(product: Products) {
    this.cartService.addItem(product);
  }
}
