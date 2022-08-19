import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../product-service/Products";
import {Category} from "./Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  url: string = "http://localhost:3000/Categories";

  getCategory() {
    return this.http.get<Category[]>(this.url);

  }
}
