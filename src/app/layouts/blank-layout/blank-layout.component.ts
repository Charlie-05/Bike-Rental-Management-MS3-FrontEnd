import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blank-layout',
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css',
    standalone: false
})
export class BlankLayoutComponent {
constructor(private router : Router){

}
}
