import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router : Router , private userService : UserService){}
  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
  ngOnInit(): void {
    this.getNotifications();
  }
  getNotifications(){
    let user = localStorage.getItem("user");
    if(user){
      let currentUser = JSON.parse(user);
      this.userService.getUserById(currentUser.NICNo).subscribe(data => {
        console.log(data);
      })
    }
  }

}
