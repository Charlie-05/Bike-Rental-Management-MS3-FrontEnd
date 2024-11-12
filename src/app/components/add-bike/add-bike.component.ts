import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IImage } from '../../modals/image';
import { IBike } from '../../modals/bike';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrl: './add-bike.component.css'
})
export class AddBikeComponent {
  addBikeForm: any;
  bike!: IBike;
  images: IImage[] = [];

  constructor(private fb: FormBuilder, private bikeService: BikeService) {
    this.addBikeForm = this.fb.group({
      brand: [''],
      model: [''],
      type: [''],
      ratePerHour: [0],
      images: this.fb.array([])
    })
  }
  removeImage(index: number) {
    this.bikeImages.removeAt(index);
  }

  onAddBike() {
    this.bike = this.addBikeForm.value;
    this.bike.images = this.images;
    console.log(this.bike);
    this.bikeService.createBike(this.bike).subscribe(() => { });
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
