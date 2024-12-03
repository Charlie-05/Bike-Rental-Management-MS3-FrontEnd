import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../services/rental-request.service';
import { IRentalRequest, Status } from '../../modals/rentalRequest';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-request-display',
    templateUrl: './request-display.component.html',
    styleUrl: './request-display.component.css',
    standalone: false
})
export class RequestDisplayComponent implements OnInit {
  rentalRequests! : IRentalRequest[];
  status!: Status;

  constructor(private rentalrequestService : RentalRequestService, private toastr : ToastrService){}

   ngOnInit(): void {
     this.rentalrequestService.getRequests().subscribe(data => {
      this.rentalRequests = data;
      console.log(data);
     })
   }
   acceptRequest(id : string,index : number){
    this.rentalrequestService.acceptRequest(id).subscribe(data => {
      console.log(data);
      this.rentalRequests.splice(index , 1);
      this.toastr.success("Request Accepted!!!")
    })
   }
   
   declineRequest(id : string, index : number){
    this.rentalrequestService.declineRequest(id).subscribe(data => {
      console.log(data);
      this.rentalRequests.splice(index , 1);
      this.toastr.warning("Request Declined!!!")
    })
   }

}

