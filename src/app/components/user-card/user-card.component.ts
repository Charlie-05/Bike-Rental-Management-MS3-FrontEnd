import { Component, OnInit } from '@angular/core';
import { IUser, Setting } from '../../modals/user';
import { UserService } from '../../services/user.service';
import { IImage } from '../../modals/image';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  standalone: false
})
export class UserCardComponent implements OnInit {
  userData!: IUser;
  upload : boolean = false;
  constructor(private userService: UserService, private toastr : ToastrService) { }
  ngOnInit(): void {
    let getUser = localStorage.getItem('user');
    if (getUser) {
      let user = JSON.parse(getUser)
      this.userService.getUserById(user.NICNo).subscribe(data => {
        console.log(data);
        if (data) {
          this.userData = data;
        }
      })
    }
  }

  loadImage(event: any) {
    const files = Array.from(event.target.files || []);
    const reader = new FileReader();
    let img: IImage = {
      imagePath: '',
    };
    files.forEach((file: any) => {
      reader.onload = (e: any) => {
        console.log(e.target?.result);
        img.imagePath = e.target?.result;
        console.log(img)
      };
      reader.readAsDataURL(file);
    });
    this.userData.profileImage = img;
    console.log(img);
    console.log(this.userData);
  }
  updateUser(){
    this.userData.profileImage = this.userData.profileImage.imagePath;
    this.userService.updateUser(this.userData.nicNumber, Setting.Info, this.userData).subscribe(data => {
      console.log(data);
      if(data){
        this.upload== false;
        this.toastr.success("Image uplaod successful", "Success")
      }
    })
  }
}
