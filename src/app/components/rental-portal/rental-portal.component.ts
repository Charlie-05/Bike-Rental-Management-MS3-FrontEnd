import { Component, OnInit } from '@angular/core';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { IRentalRequest } from '../../modals/rentalRequest';
import { RentalRequestService } from '../../services/rental-request.service';
import { IInventoryUnit } from '../../modals/inventoryUnit';

@Component({
  selector: 'app-rental-portal',
  templateUrl: './rental-portal.component.html',
  styleUrl: './rental-portal.component.css'
})
export class RentalPortalComponent implements OnInit {

  rentalRequests! : IRentalRequest[];
  currentInventoryUnits! : IInventoryUnit[];
  constructor(private inventoryUnitService : InventoryUnitService , private rentalRequestService : RentalRequestService){

  }

  ngOnInit(): void {
    this.rentalRequestService.getRequestsForPortal().subscribe(data => {
      console.log(data);
      this.rentalRequests = data;
      this.rentalRequests.forEach(request => {
        this.getAvailableInventoryUnits(request.bikeId);
      });
     
    })
  }
  getAvailableInventoryUnits(bikeId : string){
    this.inventoryUnitService.getAvailableUnitsByBikeId(bikeId).subscribe(data => {
      this.currentInventoryUnits = data;
      console.log(data);    
    })
  }

  rentOut(requestId : string){
    
  }
}
