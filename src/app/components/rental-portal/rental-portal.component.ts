import { Component, OnInit } from '@angular/core';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { IRentalRequest } from '../../modals/rentalRequest';
import { RentalRequestService } from '../../services/rental-request.service';
import { IInventoryUnit } from '../../modals/inventoryUnit';
import { RentalRecordService } from '../../services/rental-record.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-rental-portal',
    templateUrl: './rental-portal.component.html',
    styleUrl: './rental-portal.component.css',
    standalone: false
})
export class RentalPortalComponent implements OnInit {

  rentalRequests!: IRentalRequest[];
  currentInventoryUnits!: IInventoryUnit[];
  unitsPopulate : any[] = []
  rentalRecordForm!: FormGroup;
  registrationNo: string = '';
  constructor(private inventoryUnitService: InventoryUnitService, private rentalRequestService: RentalRequestService,
    private rentalRecordService: RentalRecordService, private fb: FormBuilder, private toastr: ToastrService) {
    this.rentalRecordForm = this.fb.group({
      bikeRegNo: [''],
      rentalRequestId : ['']
    })
  }

  ngOnInit(): void {
    this.rentalRequestService.getRequestsForPortal().subscribe(data => {
      console.log(data);
      this.rentalRequests = data;
      // this.rentalRequests.forEach(request => {
      //   this.getAvailableInventoryUnits(request.bikeId, index);
      // });
      // for (let index = 0; index < this.rentalRequests.length; index++) {
      //   const element = this.rentalRequests[index]; 
      //   this.getAvailableInventoryUnits(element.bikeId, index);
      // }
    })
  }
  getAvailableInventoryUnits(bikeId: string, index : number) {
    this.inventoryUnitService.getAvailableUnitsByBikeId(bikeId).subscribe(data => {
      this.currentInventoryUnits = data;
      console.log(data);
    })
  }

  rentOut(requestId: string , index : number) {
    console.log(this.rentalRecordForm.value);
    this.rentalRecordForm.value.rentalRequestId = requestId;
    this.rentalRecordService.postRentalRecord(this.rentalRecordForm.value).subscribe(data => {
      console.log(data);
      if(data){
        this.rentalRequests.splice(index , 1);
        this.toastr.success("Rent out successful");
      }
    })
  }
}
