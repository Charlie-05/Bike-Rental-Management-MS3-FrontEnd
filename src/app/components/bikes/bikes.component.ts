import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class BikesComponent {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService , private brandService : BrandService) {}
 
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  brand = {
    name : ""
  }
  onSubmit(addBrandForm : any){
    console.log(addBrandForm.value);
    this.brandService.addBrand(addBrandForm.value).subscribe(data => {
      console.log(data);
    })
  }
}
