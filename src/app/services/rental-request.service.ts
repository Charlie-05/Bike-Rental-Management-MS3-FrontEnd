import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http : HttpClient) { }

  postRequest(req : any){
    return this.http.post("" , req);
  }
}