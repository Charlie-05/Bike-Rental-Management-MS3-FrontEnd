import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(private fb : FormBuilder , private userService : UserService){
    this.loginForm = this.fb.group({
      userName:[""],
      password: [""],
      nicNumber: [""]
    })
  }

  onLogIn(){
    console.log(this.loginForm.value);
    this.userService.logIn(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token' , data.token);
      if (data) {
        const decoded: any = jwtDecode(data.token);
        localStorage.setItem('user', JSON.stringify(decoded));
      }
    })
  }
}
