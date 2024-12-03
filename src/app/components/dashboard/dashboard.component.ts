import { Component, OnInit } from '@angular/core';
import { RentalRecordService } from '../../services/rental-record.service';
import { IRentalRecord } from '../../modals/rentalRecord';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { BikeService } from '../../services/bike.service';
import { IUser } from '../../modals/user';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: false
})
export class DashboardComponent implements OnInit{
constructor(private rentalRecordService : RentalRecordService , private toastr :ToastrService,
   private userService : UserService, private bikeService : BikeService){}
overDueRecords! : IRentalRecord[];
completedRentalRecordCount : number = 0;
onRentCount : number = 0;
customerCount : number = 0;
bikeCount :number= 0;
inventoryCount : number = 0;
revenueAmount : number = 0;
ngOnInit(): void {
this.getOverDueRecords();
this.getRecords();

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
getRecords(){
  this.rentalRecordService.getRentalRecords().subscribe(data => {
    this.completedRentalRecordCount = data.length;
    data.forEach(record => {
      this.revenueAmount = this.revenueAmount + record.payment;
    });
  });
  this.rentalRecordService.getIncompleteRentalRecords().subscribe(data => {
    this.onRentCount = data.length;
  })
  this.userService.getAllCustomers().subscribe(data => {
    this.customerCount = data.length;
  })
  this.bikeService.getBikes().subscribe(data => {
    this.bikeCount = data.length;
  })
}

public barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {},
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
};

public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
public barChartDatasets = [
  { data: [65, 59, 80, 81, 56], label: 'Series A', backgroundColor: '#42A5F5' },
  { data: [28, 48, 40, 19, 86], label: 'Series B', backgroundColor: '#66BB6A' },
];
public barChartLegend = true;
public barChartType: ChartType = 'bar';





ngAfterViewInit(): void {
  this.renderChart();
}

renderChart() {
  // Initialize the chart manually using the baseChart directive
  const chartElement: any = document.getElementById('paymentsChart');

  if (chartElement) {
    new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartDatasets,
      },
      options: this.barChartOptions,
    });
  }
}

}
