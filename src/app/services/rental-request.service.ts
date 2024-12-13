import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRequest } from '../modals/rentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5057/api/RentalRequests"
  postRequest(req: any) {
    return this.http.post<IRentalRequest>(this.baseUrl, req);
  }
  getRequests() {
    return this.http.get<IRentalRequest[]>(this.baseUrl);
  }
  getRequestsForPortal() {
    return this.http.get<IRentalRequest[]>(`${this.baseUrl}?status=1`);
  }
  acceptRequest(id: string) {
    return this.http.get(`${this.baseUrl}/Accept-Request${id}`);
  }
  declineRequest(id: string) {
    return this.http.get(`${this.baseUrl}/Decline-Request${id}`);
  }
  getRequestById(id : string){
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
}
