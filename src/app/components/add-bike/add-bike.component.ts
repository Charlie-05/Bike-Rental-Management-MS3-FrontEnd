import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IImage } from '../../modals/image';
import { IBike, Types } from '../../modals/bike';
import { BikeService } from '../../services/bike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { IBrand } from '../../modals/brand';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-add-bike',
    templateUrl: './add-bike.component.html',
    styleUrl: './add-bike.component.css',
    standalone: false
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

  constructor(private fb: FormBuilder, private bikeService: BikeService , private route: ActivatedRoute 
    , private brandService : BrandService , private router : Router , private toastr:ToastrService, private imageService : ImageService) {
    this.addBikeForm = this.fb.group({
      brandId: ['' , [Validators.required]],
      model: ['' ,  [Validators.required]],
      type: ['' ,  [Validators.required]],
      ratePerHour: [0 ,  [Validators.required , Validators.min(1)]],
      description : [''],
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
    this.images.splice(index , 1);
  }

  onAddBike() {
    this.bike = this.addBikeForm.value;
    if(this.isEdit == false){
      this.bike.images = this.images;
      console.log(this.bike);
      this.bikeService.createBike(this.bike).subscribe(() => {
        this.toastr.success("Bike Successfully Added")
        this.router.navigate(['/admin/bikes'])
       });
    }else if(this.isEdit == true){
     // this.bike.images = this.images;
     this.images.forEach(img => {
        img.bikeId = this.currentBikeId;
        this.imageService.postImage(img).subscribe(data => {
          console.log(data);
        })
      });
      console.log(this.bike);
      this.bikeService.updateBike(this.bike , this.currentBikeId).subscribe(data => {
        console.log(data);
        if(data){
          this.toastr.success("Bike successfully updated");
          this.router.navigate(['/admin/bikes'])
        }
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
  deleteImage(id? : string){
    if(id){
      this.imageService.deleteImage(id).subscribe(data => {
        console.log(data)
      })
    }
   
  }
}
