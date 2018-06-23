import { Routes, RouterModule, Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnInit, NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'create-user',
        component: CreateUserComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule],
    providers: [
      { provide: PathLocationStrategy, useClass: PathLocationStrategy },
  
    ]
  })
  export class AppRoutes implements OnInit {
  
    constructor(private router: Router) {
    }
  
    ngOnInit() {
    }
  }