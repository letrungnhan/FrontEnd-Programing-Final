import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {DetailsModalComponent} from "../../../modal/details-modal/details-modal.component";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailComponent implements OnInit {
  modalRef: MdbModalRef<DetailsModalComponent> | null = null;
  constructor(private modalService: MdbModalService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  openModal() {
    this.modalRef = this.modalService.open(DetailsModalComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }
}
