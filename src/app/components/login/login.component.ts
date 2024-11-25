import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  currentError! : string;
  constructor(private fb : FormBuilder , private userService : UserService, private router : Router, private toastr : ToastrService){
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
        console.log(decoded.Role);
        if(decoded.Role != "Admin"){
          localStorage.setItem('user', JSON.stringify(decoded));
          this.toastr.success("Welcome User!!!");
          this.router.navigate(['/user']) 
        }else{
          this.router.navigate(['/admin']);

        }
       
      }
    },error => {
      this.currentError = (error.error)
    })
  }
}
