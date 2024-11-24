import { Component, OnInit, TemplateRef } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike, Types } from '../../modals/bike';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBrand } from '../../modals/brand';
import { BrandService } from '../../services/brand.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-bike',
  templateUrl: './view-bike.component.html',
  styleUrl: './view-bike.component.css'
})
export class ViewBikeComponent implements OnInit {
  filterForm!: any;
  constructor(private bikeService: BikeService, private modalService: BsModalService, private brandService: BrandService, private fb: FormBuilder) {

  };
  bikes!: IBike[];
  currentBike!: IBike;
  currentImgIndex: number = 0;
  bikeTypes!: any[];
  bikeBrands!: IBrand[];

  ngOnInit(): void {
    this.getAllBikes();
    this.getBikeTypes();
    this.getBikeBrands();
  }
  modalRef?: BsModalRef;
  modelGroupDisabled = false;
  features = {
    searchText: '',
    filterBrand: null,
    filterType: null
  }
  selected!: any;
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  getAllBikes() {
    if (this.features.filterBrand == null && this.features.filterType == null) {
      this.bikeService.getBikes().subscribe(data => {
        this.bikes = data;
        console.log(this.bikes);
      })
    } else {
      console.log("123")
    }
  }

  getBike(id: string) {
    this.bikeService.getBike(id).subscribe(data => {
      this.currentBike = data;
      console.log(this.currentBike);
      let imgCount = this.currentBike.images?.length;
      console.log(imgCount);
      this.changeImage(this.currentBike)
    });

  }
  openReqModal(id: string, template: TemplateRef<void>) {
    //Check token and redirect to login page if not
    this.modalRef = this.modalService.show(template);
  }
  viewbikeInfo(id: string) {
    console.log(id)
  }
  changeImage(bike: IBike) {
    console.log("hello")
  }
  getBikeTypes() {
    this.bikeTypes = Object.values(Types).filter(value => typeof value === 'string')
    // .map(value => ({ label: value, value }));
    console.log(this.bikeTypes);
    Object.values(Types).filter(value => typeof value === 'string')
  }
  getBikeBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.bikeBrands = data;
    })
  }
  // getTypeRadio() {
  //   console.log(this.features.filterType);
  //   if (this.features.filterType && this.features.filterBrand == null) {
  //     this.bikeService.getTypeFilters(this.features.filterType).subscribe(data => {
  //       console.log(data);
  //       this.bikes = data;
  //     })
  //   }
  // }
  // getBrandRadio() {
  //   console.log(this.features.filterBrand);
  //   if (this.features.filterBrand && this.features.filterType == null) {
  //     this.bikeService.getBrandFilters(this.features.filterBrand).subscribe(data => {
  //       console.log(data);
  //       this.bikes = data;
  //     })
  //   }
  // }
  getBothFilters() {
    console.log(this.features.filterBrand);
    console.log(this.features.filterType);
    if (this.features.filterBrand == null && this.features.filterType) {
      this.bikeService.getTypeFilters(this.features.filterType).subscribe(data => {
        console.log(data);
        this.bikes = data;
      })
    }
    else if (this.features.filterBrand && this.features.filterType == null) {
      this.bikeService.getBrandFilters(this.features.filterBrand).subscribe(data => {
        console.log(data);
        this.bikes = data;
      })
    } else if (this.features.filterBrand && this.features.filterType) {
      this.bikeService.getBikeFilters(this.features.filterType, this.features.filterBrand).subscribe(data => {
        this.bikes = data;
      })
    }
  }
}
