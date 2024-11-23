
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RentalRequestService } from '../../services/rental-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bike-popup',
  templateUrl: './bike-popup.component.html',
  styleUrl: './bike-popup.component.css'
})
export class BikePopupComponent {
  @Input() bikeData: any = '';
  rentalRequestForm: FormGroup;


  constructor(private fb: FormBuilder, private rentalRequestService: RentalRequestService, private toastr: ToastrService) {
    let getUser = (localStorage.getItem('user'))
    let user = {NICNo : ''}
    if (getUser) {
      user = JSON.parse(getUser);
    } this.rentalRequestForm = this.fb.group({
      requestTime: [''],
      bikeId: [''],
      userId: [user.NICNo]
    })

  }

  onRequest() {
    this.rentalRequestForm.value.bikeId = this.bikeData.id;
    console.log(this.rentalRequestForm.value);
    this.rentalRequestService.postRequest(this.rentalRequestForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      this.toastr.error(error.error);
    })
  }
}
