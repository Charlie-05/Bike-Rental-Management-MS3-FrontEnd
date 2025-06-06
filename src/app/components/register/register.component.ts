import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: any;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      nicNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$|^\d{7}[A-Za-z]$/)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => {
      this.roles = data;
      console.log(this.roles);
    })
  }

  onRegister() {
    this.registerForm.value.role = parseInt(this.registerForm.value.role);
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe(data => {
      console.log(data);

      if (data) {
        localStorage.setItem('token', data.token);
        const decoded: any = jwtDecode(data.token);
        localStorage.setItem('user', JSON.stringify(decoded));
        this.toastr.info("Please setup Username and password");
        this.router.navigate(['/setup']);
      }
    })
  }
}
