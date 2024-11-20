import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';

@Component({
  selector: 'app-rental-records',
  templateUrl: './rental-records.component.html',
  styleUrl: './rental-records.component.css'
})
export class RentalRecordsComponent implements OnInit {

  rentalRecords!: IRentalRecord[];
  constructor(private rentalRecordService: RentalRecordService) { }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords() {
    this.rentalRecordService.getRentalRecords().subscribe(data => {
      this.rentalRecords = data;
    })
  }

}
