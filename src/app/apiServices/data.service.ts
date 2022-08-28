import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  productUrl =
    'https://apicalls-9376a-default-rtdb.firebaseio.com/products.json';

  dataTitleUrl =
    'https://apicalls-9376a-default-rtdb.firebaseio.com/dataTitle.json';

  // To Add the Header to Our Requests
  private headers = new HttpHeaders({ 'content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // To Save Products in Database with PUT Method
  saveProducts(products: any[]): Observable<any> {
    return this.http.put(this.productUrl, products, {
      headers: this.headers,
    });
  }

  // To Fetch/Get All the Products from the Database
  fetchProducts(): Observable<any> {
    return this.http.get(this.productUrl);
  }

  // To Fetch/Get a Single Product from the Database
  fetchDataTitle(): Observable<any> {
    return this.http.get(this.dataTitleUrl);
  }
}
