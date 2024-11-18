import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRecord } from '../modals/rentalRecord';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http : HttpClient) { }
  postRentalRecord(record : any){
    return this.http.post("http://localhost:5057/api/RentalRecords" , record);
  }
  getRentalRecords(){
    return this.http.get<IRentalRecord[]>("http://localhost:5057/api/RentalRecords");
  }
  getRentalRecord(id : string){
    return this.http.get<IRentalRecord>("http://localhost:5057/api/RentalRecords/" + id)
  }
}
