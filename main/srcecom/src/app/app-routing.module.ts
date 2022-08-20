import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";

import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CartComponent} from "./components/cart/cart.component";
import {ProductsListComponent} from "./components/product/products-list/products-list.component";
import {ProductDetailComponent} from "./components/product/product-details/product-details.component";
import {OrderComponent} from "./components/order/order.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";


const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product-list', component: ProductsListComponent},
  {path: 'order', component: OrderComponent},
  {path: 'product-details/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
