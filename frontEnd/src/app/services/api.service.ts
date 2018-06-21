import { Injectable, Component, Output, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";
import { AuthService } from './auth.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { BasicService } from './basic.service';

@Injectable()

export class ApiService {

  Assets = "http://localhost:1337/assets/";
  URL = "http://localhost:1337/api"
  userData: {
    name: string,
    email: String,
    id: string,
    modules: string[]
  };

  constructor(private basicService: BasicService, private http: Http, private router: Router) {
  }

  public doLogin(obj) {
    return this.doRequest('post', 'login', obj);
  }

  public doRequest(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null): Observable<any> {
    return new Observable(obs => {
      this.request(method, url, data, obs);
    }).map((res: Response) => {
      return res.json();
    });;
  }


  private request(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null, obs) {
    let headers = new Headers({ 'x-access-token': this.userData ? this.userData.token : '' });
    let options = new RequestOptions({ headers: headers });
    if (!data)
      data = {};
    data["dt"] = new Date();
    var callback = res => {
      if (res.status === 444) {
        this.router.navigate(['/auth']);
        return;
      }

      if (res.status < 200 || res.status >= 300) {
        obs.error(res);
      }
      else {
        obs.next(res);
      }
      obs.complete();
    };

    if (method == 'get' && data) {
      options.params = data;
    }

    if (method == "get" || method == "delete") {
      this.http[method](this.URL + url, options).subscribe(callback, callback);
    }
    else
      this.http[method](this.URL + url, data, options).subscribe(callback, callback);
  }

  // //Candidato
  // criarDadosCandidato(obj) {
  //   return this.doRequest('put', 'registerDadosCandidato', obj);
  // }
  // buscarDadosCandidato(id){
  //   return this.doRequest('get', 'buscarDadoscandidato/'+ id);
  // }

  // //Empresa
  // criarDadosEmpresa(obj){
  //   return this.doRequest('put', 'registerDadosEmpresa', obj)
  // }
  // buscarDadoEmpresa(id){
  //   return this.doRequest('get', 'buscarDadosEmpresa/'+ id);
  // }

  // //Vaga
  // criarVaga(obj){
  //   return this.doRequest('post', 'registerVaga', obj);
  // }
}