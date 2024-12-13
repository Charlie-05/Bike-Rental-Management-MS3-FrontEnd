import { Component, OnInit } from '@angular/core';
import { IRentalRecord } from '../../modals/rentalRecord';
import { RentalRecordService } from '../../services/rental-record.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

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
  rentalRecords: IRentalRecord[] = [];
  dateFilter : boolean = false;
  constructor(private rentalRecordService: RentalRecordService, private datepipe : DatePipe) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
   }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords() {
    this.rentalRecordService.getRentalRecords().subscribe(data => {
      this.rentalRecords = data;
      console.log(data);
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
  
  exportToPDF() {
    const doc = new jsPDF();

    // Add a title
    doc.text('Rental Records - RentWheelz', 14, 10);
    // Generate table from data
    autoTable(doc, {
      head: [['No', 'BikeReg.No','User ID', 'Rent Out', 'Rental Return', 'Payment']],
      body: this.rentalRecords.map((row, index) => [
        index + 1, 
        row.bikeRegNo,
        row.rentalRequest.userId,
        this.datepipe.transform(row.rentalOut ,'MMM d, y, h:mm' ),   
        this.datepipe.transform(row.rentalReturn ,'MMM d, y, h:mm' ) ,
       'Rs.'+ row.payment
      ]),
      startY: 20
    });

    // Save the PDF
    doc.save(`records${this.maxDate.toISOString()}.pdf`);
  }
  printPDF() {
    const doc = new jsPDF();

    // Add a title
    doc.text('Rental Records - RentWheelz', 14, 10);

    // Generate table from data
    autoTable(doc, {
      head: [['No', 'BikeReg.No','User ID', 'Rent Out', 'Rental Return', 'Payment']],
      body: this.rentalRecords.map((row, index) => [
        index + 1, 
        row.bikeRegNo,
        row.rentalRequest.userId,
        this.datepipe.transform(row.rentalOut ,'MMM d, y, h:mm' ),   
        this.datepipe.transform(row.rentalReturn ,'MMM d, y, h:mm' ) ,
       'Rs.'+ row.payment
      ]),
      startY: 20
    });

    // Open the PDF in a new window for printing
    const pdfData = doc.output('bloburl');
    window.open(pdfData);
  }
  

}
