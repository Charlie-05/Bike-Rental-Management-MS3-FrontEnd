import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-bike',
  templateUrl: './list-bike.component.html',
  styleUrl: './list-bike.component.css'
})
export class ListBikeComponent implements OnInit {

  bikes!: IBike[];
  addUnitsForm! : FormGroup;
  modalRef?: BsModalRef;
  constructor(private bikeService: BikeService , private modalService: BsModalService , private fb : FormBuilder) {
    this.addUnitsForm = this.fb.group({
      inventoryUnits: this.fb.array([])
    })
   };

  ngOnInit(): void {
    this.loadData();
  }
  getAllBikes() {
    this.bikeService.getBikes().subscribe(data => {
      this.bikes = data;
    })
  }

  deleteBike(id: string) {
    console.log(id)
    this.bikeService.deleteBike(id).subscribe(data => {
      console.log(data);
    })
    this.loadData();
  }

  loadData() {
    this.getAllBikes();
  }
  addUnits(id: string , template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
    console.log(id)
  }


  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
