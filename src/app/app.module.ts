import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { ListBikeComponent } from './components/list-bike/list-bike.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewBikeComponent } from './components/view-bike/view-bike.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BikePopupComponent } from './components/bike-popup/bike-popup.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { RequestDisplayComponent } from './components/request-display/request-display.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { RentalPortalComponent } from './components/rental-portal/rental-portal.component';
import { RentalReturnComponent } from './components/rental-return/rental-return.component';
import { RentalPaymentComponent } from './components/rental-payment/rental-payment.component';
import { RentalRecordsComponent } from './components/rental-records/rental-records.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ListInventoryComponent } from './components/list-inventory/list-inventory.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccountSetupComponent } from './components/account-setup/account-setup.component';
import { ToastrModule } from 'ngx-toastr';
import { ListBrandsComponent } from './components/list-brands/list-brands.component';
import { BikeSearchPipe } from './pipes/bike-search.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { MyInterceptorService } from './interceptors/my-interceptor.service';
import { ReportsComponent } from './components/reports/reports.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HasRoleDirective } from './directives/has-admin.directive';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DatePipe } from '@angular/common';







@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    BlankLayoutComponent,
    LoginComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    RegisterComponent,
    AddBikeComponent,
    ListBikeComponent,
    HeaderComponent,
    FooterComponent,
    ViewBikeComponent,
    BikePopupComponent,
    RentalsComponent,
    RequestDisplayComponent,
    BikesComponent,
    RentalPortalComponent,
    RentalReturnComponent,
    RentalPaymentComponent,
    RentalRecordsComponent,
    CustomerListComponent,
    ListInventoryComponent,
    UserProfileComponent,
    AccountSetupComponent,
    ListBrandsComponent,
    BikeSearchPipe,
    UserEditComponent,
    UserHistoryComponent,
    UserCardComponent,
    ListManagerComponent,
    ReportsComponent,
    AdminSidebarComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule,
    ButtonsModule,
    RatingModule.forRoot()
  ],
  providers: [BsModalService,DatePipe, provideAnimationsAsync(),   {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptorService,
    multi: true, // Allows multiple interceptors
  }],
  bootstrap: [AppComponent,]
})
export class AppModule { }
