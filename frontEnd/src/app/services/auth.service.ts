import { Injectable } from '@angular/core';
import { Subscriber, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }
  usuario: any;

  registarUsuario(obj: { nome, email, pass} )
  {
    var sub: Subscriber<boolean>;
    var obs = new Observable<boolean>(res => {
      sub = res;
    });
    this.api.doRequest('post', 'registerCandidato', obj).subscribe(user => {
      sub.next(user);
      this.usuario = user;
    }, userErr => {
      sub.error(userErr);
    });
  }
}
