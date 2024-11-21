import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ILogIn } from '../../modals/logIn';


@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.css'
})
export class AccountSetupComponent {

  password!: string;
  confirmPassword! : string;
  result : boolean = false;
  constructor(private userService : UserService) {
  }
  userLogIn! : ILogIn;
  user = {
    userName : '',
    password : '',
    confirmPassword : ''
  }
  checkPassword(){
    if(this.user.password === this.user.confirmPassword){
      this.result = true;
    }else{
     this.result = false;
    }
  }
  onSetup(userSetupForm : any) {
    // this.userLogIn.userName = this.user.userName;
    // this.userLogIn.password = this.user.password;
    let getUser =JSON.parse(localStorage.getItem("user") || '') ;
    console.log(getUser);
    getUser.userName = this.user.userName;
    getUser.password = this.user.password;
    this.userService.updateUser(getUser, getUser.NICNo).subscribe(data => {
      console.log(data);
    })
  }
}
