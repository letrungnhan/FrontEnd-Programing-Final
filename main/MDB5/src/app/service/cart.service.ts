import {Injectable} from '@angular/core';
import {Products} from "./product-service/Products";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  placeholder = [];
  cartItems = new BehaviorSubject([]);


  constructor() {
    // @ts-ignore
    const ls = this.getCartData();
    if (ls) {
      this.cartItems.next(ls);
    }
  }

  addItem(product: Products) {
    // @ts-ignore
    const ls = this.getCartData();

    let exist: Products;

    if (ls) { // @ts-ignore
      exist = ls.find((item) => {
        // @ts-ignore
        return item.id === product.id;
      });
    }
    // @ts-ignore
    if (exist) {
      // @ts-ignore
      exist.quantity++;
      this.setCartData(ls);
    } else {
      if (ls) {
        const newData = [...ls, product];
        this.setCartData(newData);
      }
      // @ts-ignore
      this.placeholder.push(product);
      this.setCartData(this.placeholder);


    }

  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItems.next(this.getCartData());
  }

  getCartData() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('cart'))
  }
}
