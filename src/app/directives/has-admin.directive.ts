import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Roles } from '../modals/user';

@Directive({
  selector: '[appHasRole]',
  standalone: false
})
export class HasRoleDirective {

  private currentRole = '';
  constructor(private templateRef : TemplateRef<any> , private viewContainer : ViewContainerRef) { }
  @Input() set appHasRole(role : string){
    this.currentRole = role;
    this.updateView();
  }

  private updateView(){
    // let user = JSON.parse(localStorage.getItem("user") || '');
    // let role = user.role;
    // console.log(user);
    // console.log(role);
    if(this.currentRole == 'Admin'){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainer.clear();
    }
  }

}
