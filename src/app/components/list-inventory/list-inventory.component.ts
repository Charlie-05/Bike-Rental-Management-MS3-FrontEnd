import { Component, OnInit, TemplateRef } from '@angular/core';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { IInventoryUnit } from '../../modals/inventoryUnit';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-list-inventory',
    templateUrl: './list-inventory.component.html',
    styleUrl: './list-inventory.component.css',
    standalone: false
})
export class ListInventoryComponent implements OnInit {
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

  inventoryUnits! : IInventoryUnit[];
  modalRef?: BsModalRef;
  inventoryUnit = {
    registrationNo: "",
    yearOfManufacture: "",
    bikeId : "",
  }
  constructor(private inventoryUnitService : InventoryUnitService , private modalService: BsModalService) {}
  ngOnInit(): void {
    this.getAllInventoryUnits();
  }
  getAllInventoryUnits(){
    this.inventoryUnitService.getAllInventoryUnits().subscribe(data => {
      this.inventoryUnits = data;
      console.log(data);
    })
  }
  onSubmit(editInventoryUnitForm : any){

  }
  deleteInventoryUnit(unitId : string){
    this.inventoryUnitService.deleteInventoryUnit(unitId).subscribe(data => {
      console.log(data);
    })
  }
}
