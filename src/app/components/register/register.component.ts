import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm : FormGroup;
  roles : any;
  constructor(private fb : FormBuilder , private userService : UserService){
    this.registerForm = this.fb.group({
      nicNumber : ['' , [Validators.required]],
      firstName : [''],
      lastName : [''],
      email: ['' , [Validators.required , Validators.email]],
      contactNo : [''],
      address : [''],
      role: ['' , [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => {
      this.roles = data;
      console.log(this.roles);
    })
  }

  onRegister(){
    this.registerForm.value.role = parseInt(this.registerForm.value.role);
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(data => {
      console.log(data);
    })
  }
}
