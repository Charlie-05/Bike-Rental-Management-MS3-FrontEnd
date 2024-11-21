import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
  ],
  providers: [BsModalService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
