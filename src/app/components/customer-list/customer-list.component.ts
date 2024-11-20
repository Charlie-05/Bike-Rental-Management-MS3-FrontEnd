import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../modals/user';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers! : IUser[];
  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.getAllCustomers();
  }
  getAllCustomers(){
    this.userService.getAllCustomers().subscribe(data => {
      this.customers = data;
    })
  }
}
