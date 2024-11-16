import { Component, OnInit, TemplateRef } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { IBike } from '../../modals/bike';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-bike',
  templateUrl: './view-bike.component.html',
  styleUrl: './view-bike.component.css'
})
export class ViewBikeComponent implements OnInit {
 constructor(private bikeService : BikeService , private modalService: BsModalService){};
 bikes! : IBike[];
 currentBike! : IBike;
 currentImgIndex : number = 0;

 ngOnInit(): void {
  this.getAllBikes();
 }
 modalRef?: BsModalRef;


 openModal(template: TemplateRef<void>) {
   this.modalRef = this.modalService.show(template);
 }
 getAllBikes(){
  this.bikeService.getBikes().subscribe(data => {
    this.bikes = data;
    console.log(this.bikes);
  })
 }

 getBike(id : string){
  this.bikeService.getBike(id).subscribe(data => {
    this.currentBike = data;
    console.log(this.currentBike);
    let imgCount = this.currentBike.images?.length;
    console.log(imgCount);
    this.changeImage(this.currentBike)
  });

 }
 openReqModal(id : string , template: TemplateRef<void>){
  //Check token and redirect to login page if not
  this.modalRef = this.modalService.show(template);
 }
 viewbikeInfo(id : string){
  console.log(id)
 }
 changeImage(bike : IBike){
  console.log("hello") 
 }
}
