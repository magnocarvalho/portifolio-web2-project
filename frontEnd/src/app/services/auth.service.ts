import { Injectable } from '@angular/core';
import { Subscriber, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  private sub: Subscriber<boolean>;
  public onLogin: Observable<boolean>;
  public usuario: any;


  constructor(private api: ApiService) {
    this.onLogin = new Observable<boolean>(res => {
      this.sub = res;
    });
  }

  getUsuario() {
    return this.usuario;
  }

  registarUsuario(obj: { nome, email, pass }) {
    var sub: Subscriber<boolean>;
    var obs = new Observable<boolean>(res => {
      sub = res;
    });
    this.api.salvarUser(obj).subscribe(user => {
      sub.next(user);
    }, userErr => {
      console.log(userErr);
      sub.error(userErr);
    });

    return obs;
  }
  login(obj: { email, pass }) {

    var sub: Subscriber<boolean>;
    var obs = new Observable<boolean>(res => {
      sub = res;
    });
    this.api.fazerLogin(obj).subscribe(res => {
      this.usuario = res;
      console.log(this.usuario);
      sub.next(res);
    }, userErr => {
      sub.error(userErr);
    });
    //fazer login melhorar 

    // this.api.buscarUsuario(this.usuario.id).subscribe(res => {
    //   if (!this.usuario) {
    //     this.usuario = res;
    //     console.log('login feito com sucesso');
    //   } else {
    //     if (this.usuario.email != res.email) {
    //       sub.error('erro no login');
    //     }
    //   }
    //   sub.next(res);
    // }, userErr => {
    //   sub.error(userErr);
    // });

    return obs;
  }

}
