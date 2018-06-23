import { Injectable } from '@angular/core';
import { Subscriber } from '../../../node_modules/rxjs';
import { Observable } from '../../../node_modules/rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: User;
  private sub: Subscriber<boolean>;
  public onLogin: Observable<boolean>;

  constructor(private api: ApiService) {
    this.onLogin = new Observable<boolean>(res => {
      this.sub = res;
    });
   }

  
}
