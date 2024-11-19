import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';
import { IPayment } from '../../modals/payment';
import { IRentalRecRequest } from '../../modals/rentalRecRequest';

@Component({
  selector: 'app-rental-return',
  templateUrl: './rental-return.component.html',
  styleUrl: './rental-return.component.css'
})
export class RentalReturnComponent implements OnInit {
  rentalRecords!: IRentalRecord[];
  currentRecord!: IRentalRecord;
  selected: any;
  payment!: IPayment
  constructor(private rentalRecordService: RentalRecordService) { }

  ngOnInit(): void {
    this.rentalRecordService.getIncompleteRentalRecords().subscribe(data => {
      console.log(data);
      this.rentalRecords = data;
    })
  }

  displayPayment(recordId: string) {
    console.log(recordId);
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
    })
    console.log(this.currentRecord);
    this.rentalRecordService.completeRentalRecord(rec.id, this.currentRecord).subscribe(data => {
      console.log(data);
    })
  }

}
