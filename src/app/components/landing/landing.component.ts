import { Component } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  displayBikes! : IBike[]

 constructor(private bikeService : BikeService){}

 getBikes(){
  this.bikeService.getBikes().subscribe(data => {
    this.displayBikes = data;
  })
 }

}
