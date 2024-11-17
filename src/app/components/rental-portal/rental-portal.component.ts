import { Component, OnInit } from '@angular/core';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { IRentalRequest } from '../../modals/rentalRequest';
import { RentalRequestService } from '../../services/rental-request.service';

@Component({
  selector: 'app-rental-portal',
  templateUrl: './rental-portal.component.html',
  styleUrl: './rental-portal.component.css'
})
export class RentalPortalComponent implements OnInit {

  rentalRequests! : IRentalRequest[]
  constructor(private inventoryUnitService : InventoryUnitService , private rentalRequestService : RentalRequestService){

  }

  ngOnInit(): void {
    
  }
  getAvailableInventoryUnits(bikeId : string){
    this.inventoryUnitService.getAvailableUnitsByBikeId(bikeId).subscribe(data => {
      console.log(data);
    })
  }
}
