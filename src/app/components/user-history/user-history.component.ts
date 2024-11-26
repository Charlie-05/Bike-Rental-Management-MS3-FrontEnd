import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../modals/user';
import { IRentalRequest } from '../../modals/rentalRequest';
import { IRentalRecord } from '../../modals/rentalRecord';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit {
  currentUser! : IUser;
  rentalRequests! : any
  rentalRecords! : any
  constructor(private userService : UserService){}
ngOnInit(): void {
  let user = JSON.parse(localStorage.getItem('user') || '');
  this.userService.getUserById(user.NICNo).subscribe(data => {
    this.currentUser = data;
    this.rentalRequests = data.rentalRequests;
    this.rentalRecords = data.rentalRecords;
  })
}
}
