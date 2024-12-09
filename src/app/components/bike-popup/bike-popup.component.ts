
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RentalRequestService } from '../../services/rental-request.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-bike-popup',
  templateUrl: './bike-popup.component.html',
  styleUrl: './bike-popup.component.css',
  standalone: false
})
export class BikePopupComponent {
  @Input() bikeData: any = '';
  rentalRequestForm: FormGroup;
  selectedIndex: number = 0;
  constructor(private fb: FormBuilder, private rentalRequestService: RentalRequestService, private toastr: ToastrService, private modalService: NgbModal) {
    let getUser = (localStorage.getItem('user'));
    let now = new Date()
    let user = { NICNo: '' }
    if (getUser) {
      user = JSON.parse(getUser);
    } this.rentalRequestForm = this.fb.group({
      requestTime: [now],
      bikeId: [''],
      userId: [user.NICNo]
    })

  }

  onRequest() {
    this.rentalRequestForm.value.bikeId = this.bikeData.id;
    this.rentalRequestForm.value.requestTime = this.formatDate(this.rentalRequestForm.value.requestTime);
    console.log(this.rentalRequestForm.value);
    this.rentalRequestService.postRequest(this.rentalRequestForm.value).subscribe(data => {
      console.log(data);
      this.rentalRequestForm.reset();
      if (data) {
        this.toastr.success("Rental request Successful");
      }
    }
      // , error => {
      //   this.toastr.error(error.error);
      // }
    )
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
