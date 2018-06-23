import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatRadioModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CreateUserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, RouterModule, MatButtonModule, MatCheckboxModule,
    FormsModule, MatButtonModule, MatCheckboxModule, BrowserAnimationsModule,
    MatGridListModule, MatCardModule, FlexLayoutModule, AppRoutes,
    MatFormFieldModule, MatProgressBarModule, MatRadioModule,
    MatToolbarModule, MatMenuModule, MatCardModule, MatInputModule, 
    ReactiveFormsModule, MatSnackBarModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
