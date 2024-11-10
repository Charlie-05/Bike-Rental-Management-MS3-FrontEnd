import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {
  //   path: '', component: BlankLayoutComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent }
  //   ]
  // },
  // {
  //   path: 'user', component: UserLayoutComponent,
  //   children: [
  //   ],
  // },
  // { path: 'admin', component: AdminLayoutComponent }
  {
    path: 'admin', component: AdminLayoutComponent,
   // canActivate : [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {
    path: 'user', component: UserLayoutComponent,
   // canActivate : [AuthGuard],
   
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
