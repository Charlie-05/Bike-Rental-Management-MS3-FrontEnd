import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBike } from '../modals/bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }


  createBike(bike: IBike) {
    return this.http.post("http://localhost:5057/api/Bikes", bike)
  }
  getBikes(){
    return this.http.get<IBike[]>("http://localhost:5057/api/Bikes?role=2")
  }
  getBikesforAdmin(){
    return this.http.get<IBike[]>("http://localhost:5057/api/Bikes")
  }
  getBike(id : string){
    return this.http.get<IBike>("http://localhost:5057/api/Bikes/" + id)
  }
  deleteBike(id : string){
    return this.http.delete("http://localhost:5057/api/Bikes/" + id);
  }
  updateBike(bike : IBike , id : string){
    return this.http.put("http://localhost:5057/api/Bikes/" + id , bike);
  }
  getBikeFilters(bikeType : string , brandId : string){
    return this.http.get<IBike[]>(`http://localhost:5057/api/Bikes?type=${bikeType}&brandId=${brandId}`)
  }
  getBrandFilters(brandId : string){
    return this.http.get<IBike[]>(`http://localhost:5057/api/Bikes?brandId=${brandId}`)
  }
  getTypeFilters(bikeType : string){
    return this.http.get<IBike[]>(`http://localhost:5057/api/Bikes?type=${bikeType}`)
  }
}
