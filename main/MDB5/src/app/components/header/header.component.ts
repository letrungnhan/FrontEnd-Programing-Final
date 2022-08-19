import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemInCart: number | undefined;
  user: any;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(d => {
        this.itemInCart = d.length;
      }
    )


  }

}
