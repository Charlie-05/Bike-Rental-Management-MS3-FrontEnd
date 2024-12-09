import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser, Setting } from '../../modals/user';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css',
    standalone: false
})
export class UserEditComponent implements OnInit {
  currentUser!: IUser
  userInfo!: FormGroup
  constructor(private fb: FormBuilder, private userService: UserService , private toastr : ToastrService) {
    this.userInfo = this.fb.group({
      nicNumber: ['', [Validators.required]],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      contactNo: [''],
      address: [''],
      role: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    let getUser = (localStorage.getItem('user'));
    if (getUser) {
      let user = JSON.parse(getUser);
      this.userService.getUserById(user.NICNo).subscribe(data => {
        console.log(data);

        if (data) {
          this.currentUser = data;
          this.userInfo.patchValue(data);
        }
      })
    }

  }
  onEdit() {
    console.log(this.userInfo.value);
    this.userService.updateUser(this.userInfo.value, this.currentUser.nicNumber, Setting.Info).subscribe(data => {
      console.log(data);
      if(data){
        this.toastr.success("Successfully updated", "Success")
      }
    })
  }
}
