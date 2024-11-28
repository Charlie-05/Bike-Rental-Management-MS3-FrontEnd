import { Component, OnInit } from '@angular/core';
import { RentalRecordService } from '../../services/rental-record.service';
import { IRentalRecord } from '../../modals/rentalRecord';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
constructor(private rentalRecordService : RentalRecordService , private toastr :ToastrService){}
overDueRecords! : IRentalRecord[]
ngOnInit(): void {
this.getOverDueRecords();
}
getOverDueRecords(){
  this.rentalRecordService.getOverDueRentals().subscribe(data => {
    console.log(data);
    this.overDueRecords = data;
    if(this.overDueRecords.length > 0){
      this.toastr.error("Overdue alert", `Currently ${this.overDueRecords.length} are overdue.`)
    }
  })
}

}
