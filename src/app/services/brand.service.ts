import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../modals/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5057/api/Brand"
  addBrand(brand: any) {
    return this.http.post(this.baseUrl, brand);
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl);
  }
}
