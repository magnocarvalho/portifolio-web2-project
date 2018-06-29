import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicService } from './basic.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private basicService: BasicService, private http: Http, private router: Router) { }

  URL = 'http://localhost:1337/api/';
  IMG =  'http://localhost:1337/';
  userData: {
    name: string,
    email: String,
    token: string
  };
  public doLogin(id) {
    return this.doRequest('post', 'login', { token: id });
  }

  public doRequest(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null): Observable<any> {
    return new Observable(obs => {
      this.request(method, url, data, obs);
    })
  }

  private request(method: 'post' | 'put' | 'delete' | 'get', url, data: any = null, obs) {
    let headers = new Headers({ 'x-access-token': this.userData ? this.userData.token : '' });
    let options = new RequestOptions({ headers: headers });
    if (!data)
      data = {};
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
  buscarUsuario(id)
  {
     return this.doRequest('get', 'buscarUsuario/'+ id);
  }
  salvarUser(obj)
  {
    return this.doRequest('post', 'salvarUsuario', obj);
  }
  fazerLogin(obj)
  {
    return this.doRequest('post', 'loginUser', obj);
  }
  salvarFotos(obj)
  {
    return this.doRequest('post', 'salvarFotos', obj);
  }
  carregarAlbuns(id)
  {
    return this.doRequest('get', 'carregarAlbuns/'+id);
  }
  carregarAlbum(id)
  {
    return this.doRequest('get', 'carregarFotos/' + id);
  }
  apagarFoto(obj)
  {
    return this.doRequest('post', 'apagarFoto', obj);
  }
  adicionarFotos(obj)
  {
    return this.doRequest('put', 'addFotos', obj);
  }

}
