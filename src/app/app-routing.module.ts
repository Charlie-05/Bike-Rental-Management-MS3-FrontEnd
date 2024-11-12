import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { ListBikeComponent } from './components/list-bike/list-bike.component';


const routes: Routes = [

  {
    path: 'admin', component: AdminLayoutComponent,
   // canActivate : [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {path : 'add-bike' , component : AddBikeComponent},
      {path : 'bikes' , component : ListBikeComponent},
    ]
  },
  {
    path: 'user', component: UserLayoutComponent,
   // canActivate : [AuthGuard],
   children: [
   // { path: '', component: HeaderComponent },

  ]
   
  },
   {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {path : 'register' , component : RegisterComponent },
      {path : '**' , redirectTo : 'login' , pathMatch : 'full'}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
