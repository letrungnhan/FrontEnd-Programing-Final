import {Component, OnInit} from '@angular/core';
import {Products} from "../../service/product-service/Products";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Products[] = [];
  total: number | undefined;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(data => {
        this.items = data;
        if (this.items) this.getTotal(this.items);
      }
    );
  }

  onDelete(i: number) {
    this.items.splice(i, 1)
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);

  }
  validateInput(event: any, i: number) {
    const quantity = +event.target.value;
    if (quantity < 1) {
      event.target.value = this.items[i].quantity;
      return;
    }
    this.QuantityUpdate(quantity, i);
  }
  private QuantityUpdate(quantity: number, i: number) {
    this.items[i].quantity = quantity;
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);

  }
  getTotal(data: any) {
    let subs = 0;
    for (const item of data) {
      subs += item.price * item.quantity;
      this.total = subs;
    }
  }
}
