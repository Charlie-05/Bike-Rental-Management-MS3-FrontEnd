import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RentalRecordService } from '../../services/rental-record.service';
import { UserService } from '../../services/user.service';
import { BikeService } from '../../services/bike.service';
import { RentalRequestService } from '../../services/rental-request.service';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: false,

  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  bikes: any[] = [];
  users: any[] = [];
  requests: any[] = [];
  records: any[] = [];
  units: any[] = [];
  brands: any[] = [];
  constructor(private recordService: RentalRecordService, private userService: UserService, private bikeService: BikeService,
    private requestService: RentalRequestService, private unitService: InventoryUnitService, private brandService: BrandService,
    private router : Router , private toastr : ToastrService
  ) { }
  ngOnInit(): void {
    this.recordService.data$.subscribe(data => {
      console.log(data);
      if (data) {
        this.bikes = [];
        this.users= [];
        this.requests= [];
        this.records = [];
        this.units = [];
        this.brands = [];
        this.formatSearch(data)
      }
    })
  }

  formatSearch(dataArray: any[]) {
    dataArray.forEach(searchData => {
      console.log(searchData);
      if (searchData[1] == 'user') {
        this.userService.getUserById(searchData[0]).subscribe(data => {
          this.users.push(data);
          console.log(data);
        })
      } else if (searchData[1] == 'bike') {
        this.bikeService.getBike(searchData[0]).subscribe(data => {
          this.bikes.push(data);
          console.log(data);
        })
      }
      else if (searchData[1] == 'brand') {
        this.brandService.getBrandById(searchData[0]).subscribe(data => {
          this.brands.push(data);
          console.log(data);
        })
      }
      else if (searchData[1] == 'unit') {
        this.unitService.getInventoryUnitByRegNo(searchData[0]).subscribe(data => {
          this.units.push(data);
          console.log(data);
        })
      }
      else if (searchData[1] == 'request') {
        this.requestService.getRequestById(searchData[0]).subscribe(data => {
          this.requests.push(data);
          console.log(data);
        })
      }
      else if (searchData[1] == 'record') {
        this.recordService.getRentalRecord(searchData[0]).subscribe(data => {
          this.records.push(data);
          console.log(data);
        })
      }
    });
  }
  routeRequest(status : string){
    if(status == '0'){
      this.router.navigate(['/admin/rentals'])
    }else if(status == '1'){
      this.router.navigate(['/admin/rentals/portal'])
    }else if(status == '3'){
      this.router.navigate(['/admin/rentals/return'])
    }else if(status == '2'){
      this.toastr.info("Declined Request", 'Routing failed')
    }
  }
 
  
}
