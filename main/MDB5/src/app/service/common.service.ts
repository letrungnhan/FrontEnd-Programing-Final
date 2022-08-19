import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {
  }
  listAllLanguage() {
    return this.http.get("http://localhost:3000/Languages")
  }
  listAllProduct() {

      return this.http.get("http://localhost:3000/Products")
  }
  listAllIndustry() {
    return this.http.get("http://localhost:3000/Industries")
  }
  listAllTags() {
    return this.http.get("http://localhost:3000/Tags")
  }
  getProductByID(id: any) {
    return this.http.get("http://localhost:3000/Products/" + id);
  }
}
