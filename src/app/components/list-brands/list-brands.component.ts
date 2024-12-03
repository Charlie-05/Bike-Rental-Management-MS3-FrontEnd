import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { IBrand } from '../../modals/brand';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-list-brands',
    templateUrl: './list-brands.component.html',
    styleUrl: './list-brands.component.css',
    standalone: false
})
export class ListBrandsComponent implements OnInit {
  brands! : IBrand[];
  modalRef?: BsModalRef;
  brand = {
    name : ""
  }
  constructor(private brandService : BrandService , private modalService: BsModalService){}

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(){
    this.brandService.getBrands().subscribe(data => {
      this.brands = data ;
      console.log(data);
    })
  }
  editBrand(){
    
  }
  deleteBrand(){

  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
 
  onSubmit(addBrandForm : any){
    console.log(addBrandForm.value);
    this.brandService.addBrand(addBrandForm.value).subscribe(data => {
      console.log(data);
      this.brands.push(addBrandForm.value);
      this.modalRef?.hide();
    })
  }
}
