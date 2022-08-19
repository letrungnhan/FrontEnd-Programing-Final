import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  itemInCart: number | undefined;
  user: any;


  constructor(public authService: AuthenticationService,
              private router: Router,
              private toast: HotToastService,
              private cartService: CartService) {
  }

  logout() {
    this.authService.logout().pipe(
      this.toast.observe({
        success: 'Logged out successfully',
        loading: ' Logging out....',
        error: 'There was an error'

      })
    ).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );

  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(d => {
        this.itemInCart = d.length;
      }
    )


  }

}
