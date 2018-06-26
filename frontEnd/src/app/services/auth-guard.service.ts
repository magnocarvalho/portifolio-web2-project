import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    console.log(localStorage.getItem('id'));
    return localStorage.getItem('id') !== null;
  }
}
