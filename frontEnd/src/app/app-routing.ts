import { NgModule, OnInit } from '@angular/core';
import { CommonModule, PathLocationStrategy } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [
    { provide: PathLocationStrategy, useClass: PathLocationStrategy },

  ]
})
export class AppRoutingModule implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}

