import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';

@Component({
  selector: 'app-view-bike',
  templateUrl: './view-bike.component.html',
  styleUrl: './view-bike.component.css'
})
export class ViewBikeComponent implements OnInit {
 constructor(private bikeService : BikeService){};
 bikes! : IBike[];

 ngOnInit(): void {
  this.getAllBikes();
 }

 getAllBikes(){
  this.bikeService.getBikes().subscribe(data => {
    this.bikes = data;
    console.log(this.bikes);
  })
 }
}
