import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  subscribeForm : any;
  subscribe = {
    email : ''
  }
onSubscribe(){
console.log(this.subscribe.email);
}
}
