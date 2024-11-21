import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IImage } from '../../modals/image';
import { IBike, Types } from '../../modals/bike';
import { BikeService } from '../../services/bike.service';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { IBrand } from '../../modals/brand';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrl: './add-bike.component.css'
})
export class AddBikeComponent implements OnInit{
  addBikeForm: any;
  bike!: IBike;
  currentBikeId! : string ;
  currentBike! : IBike;
  isEdit : boolean = false;
  images: IImage[] = [];
  bikeTypes! : any[];
  bikeBrands! : IBrand[];

  constructor(private fb: FormBuilder, private bikeService: BikeService , private route: ActivatedRoute , private brandService : BrandService) {
    this.addBikeForm = this.fb.group({
      brandId: [''],
      model: [''],
      type: [''],
      ratePerHour: [0],
      images: this.fb.array([])
    })
    this.currentBikeId = this.route.snapshot.paramMap.get("id") || '';
    if(this.currentBikeId){
      this.isEdit = true;
    }
  }
  ngOnInit(): void {
    if(this.isEdit ==true){
      this.bikeService.getBike(this.currentBikeId).subscribe(data => {
        this.currentBike = data;
        console.log(this.currentBike);
        this.addBikeForm.patchValue(data);
      })
    }
    this.getBikeTypes();
    this.getBikeBrands();
  }

  getBikeTypes(){
    this.bikeTypes = Object.values(Types).filter(value => typeof value === 'string')
    // .map(value => ({ label: value, value }));
    console.log(this.bikeTypes);
    Object.values(Types).filter(value => typeof value === 'string')
  }
  getBikeBrands(){
    this.brandService.getBrands().subscribe(data => {
      this.bikeBrands = data;
    })
  }
  removeImage(index: number) {
    this.bikeImages.removeAt(index);
  }

  onAddBike() {
    this.bike = this.addBikeForm.value;
    if(this.isEdit == false){
      this.bike.images = this.images;
      console.log(this.bike);
      this.bikeService.createBike(this.bike).subscribe(() => { });
    }else if(this.isEdit == true){
      console.log(this.bike);
      this.bikeService.updateBike(this.bike , this.currentBikeId).subscribe(data => {
        console.log(data);
      })
    }
   
  }

  addImage() {
    this.bikeImages.push(this.fb.group({
      imagePath: ['', [Validators.required]]
    }))
  }
  get bikeImages(): FormArray {
    return this.addBikeForm.get('images') as FormArray;
  }

  loadImage(event: any) {
    const files = Array.from(event.target.files || []);
    const reader = new FileReader();
    let bikeImg: IImage = {
      imagePath: '',  
    };
    files.forEach((file: any) => {
      reader.onload = (e: any) => {
        console.log(e.target?.result);
        bikeImg.imagePath = e.target?.result;
        this.images.push(bikeImg);
      };
      reader.readAsDataURL(file);
    });
    console.log(this.images);
  }




}
