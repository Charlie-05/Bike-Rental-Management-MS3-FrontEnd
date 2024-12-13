import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser, Setting } from '../../modals/user';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrl: './customer-list.component.css',
    standalone: false
})
export class CustomerListComponent implements OnInit {
  customers!: IUser[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.userService.getAllCustomers().subscribe(data => {
      this.customers = data;
      console.log(data);
    })
  }

  blockCustomer(id: string) {
    this.userService.blockUser(id , Setting.Block).subscribe(data => {
      console.log(data);
    })
  }
  viewBlockedCustomers() {

  }
  // deleteUser(id : string){
  //   this.userService.deleteUser(id).subscribe(data => {
  //     console.log(data);
  //   })
  // }

  verifyUser(nicNo: string, i: number) {
    this.userService.verifyUser(nicNo).subscribe(data => {
      console.log(data);
    })
  }
}
