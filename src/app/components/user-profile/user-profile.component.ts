import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userInfo! : FormGroup
  constructor(private fb : FormBuilder , private userService : UserService){
    this.userInfo = this.fb.group({
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
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.userService.getUserById(user.NICNo).subscribe(data => {
      console.log(data);
      if(data){
        this.userInfo.patchValue(data);
      }
    })
  }
  onEdit(){
    console.log(this.userInfo.value)
  }

}
