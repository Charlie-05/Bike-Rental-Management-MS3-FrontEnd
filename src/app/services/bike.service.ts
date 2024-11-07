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
}
