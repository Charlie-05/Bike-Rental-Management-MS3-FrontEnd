import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../modals/user';
import { IRentalRequest } from '../../modals/rentalRequest';
import { IRentalRecord } from '../../modals/rentalRecord';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IReviewRequest } from '../../modals/reviewRequest';
import { RentalRecordService } from '../../services/rental-record.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css',
  standalone: false
})
export class UserHistoryComponent implements OnInit {
  currentUser!: IUser;
  rentalRequests!: any
  rentalRecords!: any;
  currentRecordId: string = ''
  ratingModel = {
    rating: 1,
    message: '',
  }

  modalRef?: BsModalRef;
  // Default rating
  max: number = 5; // Number of stars
  readonly: boolean = false; // Allow user to interact
  hovered: number | null = null; // Track hovered rating
  titles: string[] = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];



  onLeave(): void {
    this.hovered = null; // Clear hovered rating on leave
  }

  constructor(private userService: UserService, private modalService: BsModalService, private rentalRecordService: RentalRecordService) { }
  ngOnInit(): void {
    let getUser = localStorage.getItem('user');
    if (getUser) {
      let user = JSON.parse(getUser);
      this.userService.getUserById(user.NICNo).subscribe(data => {
        this.currentUser = data;
        console.log(data);
        this.rentalRequests = data.rentalRequests?.slice(0, 5);
        this.rentalRecords = data.rentalRecords?.slice(0, 5);
      })
    }

  }
  onSubmit(form: any) {
    let reviewRequest: IReviewRequest = {
      recordId: this.currentRecordId,
      rating: form.value.rating,
      review: form.value.message
    }
    console.log(form.value);
    this.rentalRecordService.postReview(reviewRequest).subscribe(data => {
      console.log(data);
      if (data) {
        this.modalRef?.hide();
      }
    })

  }

  openModal(template: TemplateRef<void>, recordId: string) {
    this.modalRef = this.modalService.show(template);
    this.currentRecordId = recordId;
  }

}

