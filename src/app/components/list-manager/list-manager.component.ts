import { Component, OnInit } from '@angular/core';
import { IUser } from '../../modals/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrl: './list-manager.component.css'
})
export class ListManagerComponent implements OnInit {
  managers! : IUser[];
  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.getAllManagers();
  }
  getAllManagers(){
    this.userService.getAllManagers().subscribe(data => {
      this.managers = data;
      console.log(data);
    })
  }

  verifyManager(nicNo : string){
    this.userService.verifyUser(nicNo).subscribe(data => {
      console.log(data);
    })
  }
  viewBlockedCustomers(){
    
  }
  blockManger(id : string){
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
    })
  }
}
