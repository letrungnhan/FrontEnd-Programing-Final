import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

  listAllCategory() {
    return this.http.get("http://localhost:3000/Categories")
  }
  listAllProduct(){
    return this.http.get("http://localhost:3000/Products")
  }
}
