import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';

@Component({
  selector: 'app-rental-return',
  templateUrl: './rental-return.component.html',
  styleUrl: './rental-return.component.css'
})
export class RentalReturnComponent implements OnInit {
rentalRecords! : IRentalRecord[];
constructor(private rentalRecordService : RentalRecordService ){}

  ngOnInit(): void {
    this.rentalRecordService.getRentalRecords().subscribe(data => {
      console.log(data);
       this.rentalRecords = data;
    })
  }
  displayPayment(recordId : string){
    console.log(recordId);
    this.rentalRecordService.getRentalRecord(recordId).subscribe(data => {
      console.log(data);
    })
  }

}
