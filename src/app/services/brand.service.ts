import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../modals/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http : HttpClient) { }

  addBrand(brand : any){
    return this.http.post("http://localhost:5057/api/Brand" , brand);
  }
  getBrands(){
    return this.http.get<IBrand[]>("http://localhost:5057/api/Brand");
  }
}
