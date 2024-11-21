import { Component, OnInit } from '@angular/core';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { IInventoryUnit } from '../../modals/inventoryUnit';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrl: './list-inventory.component.css'
})
export class ListInventoryComponent implements OnInit {

  inventoryUnits! : IInventoryUnit[]
  constructor(private inventoryUnitService : InventoryUnitService){}
  ngOnInit(): void {
    this.getAllInventoryUnits();
  }
  getAllInventoryUnits(){
    this.inventoryUnitService.getAllInventoryUnits().subscribe(data => {
      this.inventoryUnits = data;
      console.log(data);
    })
  }
  editInventoryUnit(){

  }
  deleteInventoryUnit(){
    
  }
}
