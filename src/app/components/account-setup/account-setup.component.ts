import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ILogIn } from '../../modals/logIn';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.css'
})
export class AccountSetupComponent implements OnInit {

  password!: string;
  confirmPassword! : string;
  result : boolean = false;
  currentUser! : any;
  constructor(private userService : UserService , private router : Router , private toastr : ToastrService) {
  }
  userLogIn! : ILogIn;
  user = {
    userName : '',
    password : '',
    confirmPassword : ''
  }

  ngOnInit(): void {
    let getUser =JSON.parse(localStorage.getItem("user") || '') ;
    console.log(getUser);
    if(getUser.Role == "Admin"){
      this.router.navigate(['/admin'])
    }
    this.userService.getUserById(getUser.NICNo).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    })
  }
  checkPassword(){
    if(this.user.password === this.user.confirmPassword){
      this.result = true;
    }else{
     this.result = false;
    }
  }
  onSetup(userSetupForm : any) {
    this.currentUser.userName = this.user.userName;
    this.currentUser.hashPassword = this.user.password;
    this.userService.updateUser(this.currentUser, this.currentUser.NICNo).subscribe(data => {
      console.log(data);
      this.toastr.success("Welcome User!!!")
      this.router.navigate(['/user'])
    })
  }
}
