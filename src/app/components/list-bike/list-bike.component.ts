import { Component, OnDestroy, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-list-bike',
  templateUrl: './list-bike.component.html',
  styleUrl: './list-bike.component.css'
})
export class ListBikeComponent implements OnInit {

  constructor(private bikeService : BikeService){};

  ngOnInit(): void {
    this.getAllBikes();
  }
  getAllBikes(){
    this.bikeService.getBikes().subscribe(data => {
      console.log(data);
    })
  }
}
