import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRentalRequest } from '../modals/rentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http: HttpClient) { }

  postRequest(req: any) {
    return this.http.post<IRentalRequest>("http://localhost:5057/api/RentalRequests", req);
  }
  getRequests() {
    return this.http.get<IRentalRequest[]>("http://localhost:5057/api/RentalRequests");
  }
  getRequestsForPortal() {
    return this.http.get<IRentalRequest[]>("http://localhost:5057/api/RentalRequests?status=1");
  }
  acceptRequest(id: string) {
    return this.http.get("http://localhost:5057/api/RentalRequests/Accept-Request" + id);
  }
  declineRequest(id: string) {
    return this.http.get("http://localhost:5057/api/RentalRequests/Decline-Request" + id);
  }
}
