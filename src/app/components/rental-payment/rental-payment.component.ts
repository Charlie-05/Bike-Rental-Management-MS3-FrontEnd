import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';
import { IPayment } from '../../modals/payment';
import { IRentalRecRequest } from '../../modals/rentalRecRequest';

@Component({
  selector: 'app-rental-payment',
  templateUrl: './rental-payment.component.html',
  styleUrl: './rental-payment.component.css'
})
export class RentalPaymentComponent {
  @Input() recordData!: IRentalRecord;
  @Input() payment!: IPayment;
  @Output() addRecord: any = new EventEmitter();
  recRequest: IRentalRecRequest = {
    id: '',
    payment: 0
  };
  currentTime!: Date;

  completeRecord(finalPayment: number, recordId : string) {
    if (this.recRequest) {
      this.recRequest.id = recordId;
      this.recRequest.payment = parseFloat(finalPayment.toFixed(2));
      console.log(this.recRequest);
      this.addRecord.emit(this.recRequest);
    }else{
      console.log(this.recRequest);
    }
  }
  constructor() {
    this.currentTime = new Date();
  }

}
