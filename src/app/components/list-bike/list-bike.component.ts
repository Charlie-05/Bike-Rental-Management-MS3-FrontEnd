import { Component, OnDestroy, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';

@Component({
  selector: 'app-list-bike',
  templateUrl: './list-bike.component.html',
  styleUrl: './list-bike.component.css'
})
export class ListBikeComponent implements OnInit {
  bikes! : IBike[];
  constructor(private bikeService : BikeService){};

  ngOnInit(): void {
   this.loadData();
  }
  getAllBikes(){
    this.bikeService.getBikes().subscribe(data => {
      this.bikes = data;
    })
  }

  deleteBike(id : string){
    console.log(id)
    this.bikeService.deleteBike(id).subscribe(data => {
      console.log(data);
    })
    this.loadData();
  }

  loadData(){
    this.getAllBikes();
  }
}
