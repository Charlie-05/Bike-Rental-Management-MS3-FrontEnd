import { Component, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser, Setting } from '../../modals/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalRecordService } from '../../services/rental-record.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css',
    standalone: false,
    
})
export class AdminLayoutComponent {

  currentUser!: IUser;
  formDisplay!: boolean;
  features = {
    searchText : ''
  }
  resultCounter : number = 0;

  user = {
    oldUserName: this.currentUser?.userName,
    newUserName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  constructor(private userService: UserService, private modalService: BsModalService, private router : Router,
     private toastr : ToastrService, private recordService : RentalRecordService) {
    this.getUserInfo();
  }
  getUserInfo() {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.userService.getUserById(user.NICNo).subscribe(data => {
      this.currentUser = data;
    })
  }
  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    let login = {
      userName: this.currentUser?.userName,
      password: myForm.value.password
    };
    console.log(login);
    this.userService.logIn(login).subscribe(data => {
      console.log(data);
      if(data){
        this.currentUser.userName = myForm.value.userName;
        this.currentUser.hashPassword = myForm.value.newPassword;
        console.log(this.currentUser);
        this.userService.updateUser(this.currentUser.nicNumber, Setting.Credentilas, this.currentUser).subscribe(data => {
          console.log(data);
          if(data){
            this.toastr.success("Successfully updated", "Success")
          }
        })
      }
    })
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
  search(){
    console.log(this.features.searchText);
    this.recordService.search(this.features.searchText).subscribe(data => {
      console.log(data);
      if(data){
       this.resultCounter = Object.keys(data).length;
       let resArray = Object.entries(data)
       this.recordService.updateData(resArray);      
      //  resArray.forEach(res => {
      //     console.log(res);
      //   });
      }
      
    })
  }
  assignCount(){
    this.resultCounter = 0;
  }

}
