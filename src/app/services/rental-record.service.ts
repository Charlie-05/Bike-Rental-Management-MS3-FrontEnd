import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRecord } from '../modals/rentalRecord';
import { IPayment } from '../modals/payment';
import { IRentalRecRequest } from '../modals/rentalRecRequest';
import { IReviewRequest } from '../modals/reviewRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:5057/api/RentalRecords"
  //http://localhost:5057/api/RentalRecords/
  postRentalRecord(record: any) {
    return this.http.post(this.baseUrl, record);
  }
  getRentalRecords() {
    return this.http.get<IRentalRecord[]>(`${this.baseUrl}?state=1`);
  }
  getIncompleteRentalRecords() {
    return this.http.get<IRentalRecord[]>(`${this.baseUrl}?state=0`)
  }
  getRentalRecord(id: string) {
    return this.http.get<IRentalRecord>(`${this.baseUrl}/${id}`)
  }
  getRentalPayment(id: string) {
    return this.http.get<IPayment>(`${this.baseUrl}/get-payment${id}`)
  }
  completeRentalRecord(id: string, req: any) {
    return this.http.put<IRentalRecord>(`${this.baseUrl}/complete-record?id=${id}`, req);
  }

  getOverDueRentalsOfUser(nicNo: string) {
    return this.http.get<IRentalRecord[]>(`${this.baseUrl}/Get-overdue?nicNo=${nicNo}`);
  }
  getOverDueRentals() {
    return this.http.get<IRentalRecord[]>(`${this.baseUrl}/Get-overdue`);
  }
  postReview(obj : IReviewRequest){
    return this.http.post(`${this.baseUrl}/Review` , obj)
  }
}
