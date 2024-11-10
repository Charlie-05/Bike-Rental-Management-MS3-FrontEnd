import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : any;
  constructor(private fb : FormBuilder){
    this.registerForm = this.fb.group({
      nicNumber : ['' , [Validators.required]],
      firstName : [''],
      lastName : [''],
      email: ['' , [Validators.required , Validators.email]],
      contactNo : [''],
      address : [''],
      password: ['' , [Validators.required]],
      role: ['' , [Validators.required]],
    })
  }
}
