import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBike } from '../modals/bike';
import { Roles } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }
baseUrl = "http://localhost:5057/api/Bikes";

  createBike(bike: IBike) {
    return this.http.post(this.baseUrl, bike)
  }
  getBikes(){
    return this.http.get<IBike[]>(`${this.baseUrl}?role=2`)
  }
  getBikesforAdmin(){
    return this.http.get<IBike[]>(this.baseUrl)
  }
  getBike(id : string){
    return this.http.get<IBike>(`${this.baseUrl}/${id}`)
  }
  deleteBike(id : string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateBike(bike : IBike , id : string){
    return this.http.put(`${this.baseUrl}/${id}`, bike);
  }
  getBikeFilters(bikeType : string , brandId : string, role? : Roles){
    if(role){
      return this.http.get<IBike[]>(`${this.baseUrl}?type=${bikeType}&brandId=${brandId}&role=2`)
    }else{
      return this.http.get<IBike[]>(`${this.baseUrl}?type=${bikeType}&brandId=${brandId}`)
    }
   
  }
  getBrandFilters(brandId : string,  role? : string){
    if(role){
      return this.http.get<IBike[]>(`${this.baseUrl}?brandId=${brandId}&role=2`)
    }else{
      return this.http.get<IBike[]>(`${this.baseUrl}?brandId=${brandId}`)
    }
  }
  getTypeFilters(bikeType : string,  role? : string){
    if(role){
      return this.http.get<IBike[]>(`${this.baseUrl}?type=${bikeType}&role=2`)
    }else{
      return this.http.get<IBike[]>(`${this.baseUrl}?type=${bikeType}`)
    }
  }
  ////http://localhost:5057/api/Bikes?type=Classic&brandId=C9DC0632-EAEF-4446-CB68-08DD177D5544&role=2
}
