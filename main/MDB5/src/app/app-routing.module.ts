import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'footer', component:FooterComponent},
  {path: 'header', component:HeaderComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
