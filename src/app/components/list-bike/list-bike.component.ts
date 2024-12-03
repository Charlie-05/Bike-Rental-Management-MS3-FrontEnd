import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventoryUnit } from '../../modals/inventoryUnit';
import { InventoryUnitService } from '../../services/inventory-unit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-list-bike',
    templateUrl: './list-bike.component.html',
    styleUrl: './list-bike.component.css',
    standalone: false
})
export class ListBikeComponent implements OnInit {

  bikes!: IBike[];
  currentBike!: IBike;
  currentBikeId!: string;
  currentBikeIndex! : number
  // currentBikeUnits! : IInventoryUnit[];
  addBikeUnits!: IInventoryUnit;
  addUnitsForm!: FormGroup;
  modalRef1?: BsModalRef;
  modalRef?: BsModalRef;
  constructor(private bikeService: BikeService, private modalService: BsModalService, private fb: FormBuilder
    , private inventoryUnitService: InventoryUnitService, private toastr: ToastrService) {
    this.addUnitsForm = this.fb.group({
      inventoryUnits: this.fb.array([])
    })
  };

  ngOnInit(): void {
    this.loadData();
  }
  getAllBikes() {
    this.bikeService.getBikesforAdmin().subscribe(data => {
      this.bikes = data;
    })
  }

  deleteBike(id: string, template: TemplateRef<void>, index : number) {
    this.modalRef1 = this.modalService.show(template);
    this.currentBikeId = id
    this.currentBikeIndex = index;

  }
  confirm(): void {
    this.bikeService.deleteBike(this.currentBikeId).subscribe(data => {
      console.log(data);
      if (data) {
        this.toastr.success("Successfully Deleted", "Success")
        this.modalRef1?.hide();
        this.bikes.splice(this.currentBikeIndex, 1);
      }
    })
  }

  decline(): void {
    this.modalRef1?.hide();
  }

  loadData() {
    this.getAllBikes();
  }
  addUnits(id: string, template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.bikeService.getBike(id).subscribe(data => {
      this.currentBike = data;
      // this.currentBikeId = data.id;
      //this.currentBikeUnits = data.inventoryUnits;
    })
  }

  addUnit() {
    this.inventoryUnits.push(this.fb.group({
      registrationNo: [''], // format validation
      yearOfManufacture: [''], //Future validation
      bikeId: [this.currentBike.id]
    }))
  }
  removeUnit(index: number) {
    this.inventoryUnits.removeAt(index);
  }


  get inventoryUnits(): FormArray {
    return this.addUnitsForm.get('inventoryUnits') as FormArray;
  }
  onAddUnits() {
    this.addBikeUnits = this.addUnitsForm.value.inventoryUnits;
    console.log(this.addBikeUnits)
    this.inventoryUnitService.postUnits(this.addBikeUnits).subscribe(data => {
      console.log(data);
      this.getAllBikes();
      this.modalRef?.hide()
    })
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
