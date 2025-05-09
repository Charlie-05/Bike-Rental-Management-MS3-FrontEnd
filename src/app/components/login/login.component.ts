import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  currentError!: string;
  logInAttempts : number = 0;
  formInvalid : boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
    if(this.logInAttempts > 5){
      this.formInvalid = true;
      this.toastr.warning("You have reached maximum attempts")
    }
  }

  onLogIn() {
    this.logInAttempts = parseInt(JSON.parse(localStorage.getItem('attempts') || '0'));
    if(this.logInAttempts > 5){
      this.toastr.warning("You have reached maximum attempts");
      this.formInvalid = true;
    }
    console.log(this.loginForm.value);
    this.userService.logIn(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token', data.token);
      if (data) {
        const decoded: any = jwtDecode(data.token);
        console.log(decoded.Role);
        localStorage.setItem('user', JSON.stringify(decoded));
        if (decoded.Role == "User") {

          this.toastr.success("Welcome User!!!");
          this.router.navigate(['/user'])
        } else if (decoded.Role != "User") {
          this.router.navigate(['/admin']);
        }
      }
    }, error => {
      this.currentError = (error.error);
      this.logInAttempts++;
      console.log(this.logInAttempts);
      localStorage.setItem('attempts', JSON.stringify(this.logInAttempts));
    })
  }
}
