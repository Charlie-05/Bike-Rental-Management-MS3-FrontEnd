import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';

@Component({
    selector: 'app-rental-records',
    templateUrl: './rental-records.component.html',
    styleUrl: './rental-records.component.css',
    standalone: false
})
export class RentalRecordsComponent implements OnInit {
  bsInlineRangeValue: Date[];
  bsInlineValue = new Date();
  maxDate = new Date()
  rentalRecords!: IRentalRecord[];
  dateFilter : boolean = false;
  constructor(private rentalRecordService: RentalRecordService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
   }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords() {
    this.rentalRecordService.getRentalRecords().subscribe(data => {
      this.rentalRecords = data;
    })
  }
  getFilterRecords(){
    if(this.dateFilter == true){
      this.dateFilter = false;
      this.getAllRecords();
    }else if(this.dateFilter == false){
      this.dateFilter = true;
      this.onDateRangeChange(this.bsInlineRangeValue)
    }
  }
  onDateRangeChange(selectedRange: any) {
    this.bsInlineRangeValue = selectedRange;
    let startDate = this.bsInlineRangeValue[0].toISOString();
    let endDate = this.bsInlineRangeValue[1].toISOString();
    this.rentalRecordService.getRecordsbyRange(startDate , endDate).subscribe(data => {
      console.log(data);
      this.rentalRecords = data;
    })
  }
  

}
