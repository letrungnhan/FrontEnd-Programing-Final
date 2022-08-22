import {Component, OnInit} from '@angular/core';
import {Products} from "../../service/product-service/Products";
import {CartService} from "../../service/cart.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Products[] = [];
  total: number | undefined;
  itemInCart: number | undefined;

  constructor(public cartService: CartService,
              private authService: AuthenticationService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getQuantity();
    this.cartService.cartItems.subscribe(data => {
        this.items = data;
        if (this.items) this.getTotal(this.items);
      }
    );
  }
  onDelete(i: number) {
    this.items.splice(i, 1)
    // @ts-ignore
    localStorage.removeItem('cart', JSON.stringify(this.items));
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

  getQuantity(): void {
    this.cartService.cartItems.subscribe(d => {
      this.itemInCart = d.length;
    });
  }


  onCheckOut() {
    this.authService.currentUser$.subscribe(user => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/checkout']);
        }
      }
    )
  }
}
