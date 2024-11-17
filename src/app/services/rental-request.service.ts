import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRequest } from '../modals/rentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http : HttpClient) { }

  postRequest(req : any){
    return this.http.post<IRentalRequest>("http://localhost:5057/api/RentalRequests" , req);
  }
}
