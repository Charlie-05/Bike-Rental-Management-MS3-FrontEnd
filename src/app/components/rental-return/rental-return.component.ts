import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';
import { IPayment } from '../../modals/payment';
import { IRentalRecRequest } from '../../modals/rentalRecRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-rental-return',
    templateUrl: './rental-return.component.html',
    styleUrl: './rental-return.component.css',
    standalone: false
})
export class RentalReturnComponent implements OnInit {
  rentalRecords!: IRentalRecord[];
  currentRecord!: IRentalRecord;
  selected: any;
  payment!: IPayment;
  currentIndex! : number;
  constructor(private rentalRecordService: RentalRecordService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.rentalRecordService.getIncompleteRentalRecords().subscribe(data => {
      console.log(data);
      this.rentalRecords = data;
    })
  }

  displayPayment(recordId: string , index:number) {
    console.log(recordId);
    this.currentIndex = index;
    this.rentalRecordService.getRentalPayment(recordId).subscribe(data => {
      console.log(data);
      this.payment = data;
    })
  }
  receiveRecord(rec: IRentalRecRequest) {
    console.log(rec);
    this.rentalRecordService.getRentalRecord(rec.id).subscribe(data => {
      console.log(data);
      this.currentRecord = data;
      this.currentRecord.payment = rec.payment;
      console.log(this.currentRecord);
      this.rentalRecordService.completeRentalRecord(rec.id, this.currentRecord).subscribe(data => {
        console.log(data);
        if(data){
          this.toastr.success("Payment successful");
          this.rentalRecords.splice(this.currentIndex,1)
        }
      })
    })

  }

}
