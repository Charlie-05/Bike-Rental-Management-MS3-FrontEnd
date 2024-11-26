import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../services/rental-request.service';
import { IRentalRequest, Status } from '../../modals/rentalRequest';


@Component({
  selector: 'app-request-display',
  templateUrl: './request-display.component.html',
  styleUrl: './request-display.component.css'
})
export class RequestDisplayComponent implements OnInit {
  rentalRequests! : IRentalRequest[];
  status!: Status;
  requestStatus! : string;
  constructor(private rentalrequestService : RentalRequestService){}

   ngOnInit(): void {
     this.rentalrequestService.getRequests().subscribe(data => {
      this.rentalRequests = data;
      console.log(data);
     })
   }
   acceptRequest(id : string,index : number){
    this.rentalrequestService.acceptRequest(id).subscribe(data => {
      console.log(data);
      this.requestStatus = this.requestStatus + id;
    })
   }
   
   declineRequest(id : string, index : number){
    this.rentalrequestService.declineRequest(id).subscribe(data => {
      console.log(data);
    })
   }

}

