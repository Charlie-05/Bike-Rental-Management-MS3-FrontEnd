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
import { RentalsComponent } from './components/rentals/rentals.component';
import { RequestDisplayComponent } from './components/request-display/request-display.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { RentalPortalComponent } from './components/rental-portal/rental-portal.component';
import { RentalReturnComponent } from './components/rental-return/rental-return.component';
import { RentalRecordsComponent } from './components/rental-records/rental-records.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ListInventoryComponent } from './components/list-inventory/list-inventory.component';
import { AccountSetupComponent } from './components/account-setup/account-setup.component';
import { ListBrandsComponent } from './components/list-brands/list-brands.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewBikeComponent } from './components/view-bike/view-bike.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';


const routes: Routes = [

  {
    path: 'admin', component: AdminLayoutComponent,
     canActivate : [AdminAuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'bikes', component: BikesComponent, children: [
          { path: '', component: ListBikeComponent },
          { path: 'add-bike', component: AddBikeComponent },
          { path: 'edit-bike/:id', component: AddBikeComponent },
          { path: 'inventory', component: ListInventoryComponent },
          { path: 'brands', component: ListBrandsComponent },
        ]
      },
      {
        path: 'rentals', component: RentalsComponent, children: [
          { path: '', component: RequestDisplayComponent },
          { path: 'requests', component: RequestDisplayComponent },
          { path: 'portal', component: RentalPortalComponent },
          { path: 'return', component: RentalReturnComponent },
          { path: 'records', component: RentalRecordsComponent }
        ]
      },
      {
        path: 'customers', component: CustomerListComponent
      },
      {
        path: 'managers', component: ListManagerComponent
      },
      {
        path: 'reports', component: ReportsComponent
      },
      

    ]
  },
  {
    path: 'user', component: UserLayoutComponent,
     canActivate : [AuthGuard],
    children: [
      { path: '', component: ViewBikeComponent },
      {
        path: 'profile', component: UserProfileComponent,
        children: [
          { path: '', component: UserCardComponent },
          { path: 'edit', component: UserEditComponent },
          { path: 'history', component: UserHistoryComponent }
        ]
      },

    ]

  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      {path :'', component : UserLayoutComponent, children : [
        { path: '', component: ViewBikeComponent }
      ] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'setup', component: AccountSetupComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
