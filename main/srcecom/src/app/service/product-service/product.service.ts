import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "./Products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  url: string = "http://localhost:3000/Products";
  getProducts() {
    return this.http.get<Products[]>(this.url);

  }
}
