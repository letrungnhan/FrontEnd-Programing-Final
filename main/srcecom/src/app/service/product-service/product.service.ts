import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "./Products";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  search = new BehaviorSubject(<String>(""));
  constructor(private http: HttpClient) {
  }
  url: string = "https://src-ecomos-web.herokuapp.com/Products";
  getProducts() {
    return this.http.get<Products[]>(this.url);
  }
}
