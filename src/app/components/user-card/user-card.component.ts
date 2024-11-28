import { Component, OnInit } from '@angular/core';
import { IUser } from '../../modals/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{
userData! : IUser;
constructor(private userService : UserService){}
ngOnInit(): void {
  let user = JSON.parse(localStorage.getItem('user') || '');
  this.userService.getUserById(user.NICNo).subscribe(data => {
    console.log(data);

    if(data){
      this.userData = data;
      
    }
  })
}
}
