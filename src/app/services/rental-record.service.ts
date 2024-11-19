import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRecord } from '../modals/rentalRecord';
import { IPayment } from '../modals/payment';
import { IRentalRecRequest } from '../modals/rentalRecRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http : HttpClient) { }
  postRentalRecord(record : any){
    return this.http.post("http://localhost:5057/api/RentalRecords" , record);
  }
  getRentalRecords(){
    return this.http.get<IRentalRecord[]>("http://localhost:5057/api/RentalRecords?state=1");
  }

  getIncompleteRentalRecords(){
    return this.http.get<IRentalRecord[]>("http://localhost:5057/api/RentalRecords?state=0")
  }
  getRentalRecord(id : string){
    return this.http.get<IRentalRecord>("http://localhost:5057/api/RentalRecords/" + id)
  }
  getRentalPayment(id : string){
    return this.http.get<IPayment>("http://localhost:5057/api/RentalRecords/get-payment" + id)
  }
  completeRentalRecord(id : string , req : any){
    return this.http.put<IRentalRecord>("http://localhost:5057/api/RentalRecords/complete-record?id=" + id , req);
  }
}
