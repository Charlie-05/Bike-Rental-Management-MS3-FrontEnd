import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from '../modals/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }
////http://localhost:5057/api/Images/9245fe4a-d402-451c-b9ed-9c1a04247482;
url : string = "http://localhost:5057/api/Images"
  deleteImage(id : string){
    return this.http.delete(`${this.url}/${id}`)
  }

  postImage(obj : IImage){
    return this.http.post(this.url , obj);
  }
}
