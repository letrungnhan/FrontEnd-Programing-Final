import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

  listAllLanguage() {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Languages")
  }

  listAllProduct() {

    return this.http.get("https://src-ecomos-web.herokuapp.com/Products")
  }

  listAllIndustry() {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Industries")
  }

  listAllTags() {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Tags")
  }

  getProductByID(id: any) {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Products/" + id);
  }

  getProductByPrice(price: any) {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Products/" + price);
  }

  getHomeFeatured() {
    return this.http.get("https://src-ecomos-web.herokuapp.com/Products?_start=20&_limit=4");
  }
}
