import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../modals/user';
import { RentalRecordService } from '../../services/rental-record.service';
import { IRentalRecord } from '../../modals/rentalRecord';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../../modals/rentalRequest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private rentalRecordService: RentalRecordService, private toastr: ToastrService) {
    this.getNotifications();
  }
  currentUser!: IUser;
  currentUserOverDue: IRentalRecord[] = [];
  notifyCount!: number | undefined;
  logOut() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
  ngOnInit(): void {

  }
  getNotifications() {
    let user = localStorage.getItem("user");
    if (user) {
      let currentUser = JSON.parse(user);
      this.userService.getUserById(currentUser.NICNo).subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
        this.notifyCount = this.currentUser?.rentalRequests?.length
        if (this.currentUser) {
          this.rentalRecordService.getOverDueRentalsOfUser(this.currentUser.nicNumber).subscribe(data => {
            console.log(data);
            this.currentUserOverDue = data;
            if (this.currentUserOverDue.length > 0) {
              this.toastr.error("Overdue Alert", `You have ${this.currentUserOverDue.length} overdue rentals...`)
            }
            let acceptedReqs = this.currentUser?.rentalRequests?.filter(r => r.status == Status.accepted);
            let declinedReqs = this.currentUser?.rentalRequests?.filter(r => r.status == Status.declined);
            console.log(acceptedReqs);
            console.log(declinedReqs);

            declinedReqs?.length == 0 ? '' : this.toastr.warning("Declined Request", `You have ${declinedReqs?.length} declined rental requests`)
            acceptedReqs?.length == 0 ? '' : this.toastr.info("Accepted Request", `You have ${acceptedReqs?.length} accepted rental requests`)
            this.notifyCount = this.notifyCount ? this.notifyCount + this.currentUserOverDue.length : this.notifyCount;
          })
        }

      })
    }
  }

}
