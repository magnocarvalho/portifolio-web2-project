import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
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
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { PhotoComponent } from './photo/photo.component';
import { DialogComponent } from './dialog/dialog.component';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    DashboardComponent,
    PhotoComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule, RouterModule, 
    FormsModule, MatButtonModule, MatCheckboxModule, BrowserAnimationsModule,
    MatGridListModule, MatCardModule, FlexLayoutModule, AppRoutes, 
    MatFormFieldModule, MatProgressBarModule, MatRadioModule,
    MatToolbarModule, MatMenuModule, MatInputModule,
    ReactiveFormsModule, MatSnackBarModule, HttpModule, MatIconModule, MatSidenavModule, MatListModule,
    MatDialogModule, LoadingBarHttpModule, HttpClientModule, LoadingBarModule,  LoadingBarHttpClientModule
  ],
  entryComponents: [DialogComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
