import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private api: ApiService, private snackbar: MatSnackBar) { }
  public albuns: any;
  public url = '';


  ngOnInit() {
    this.url = this.api.IMG;
    this.carregarAlbuns();
  }
  
  openSnackBar(frase) {
    this.snackbar.open(frase, 'OK', {
      duration: 6000
    });
  }

  carregarAlbuns()
  {
    this.api.carregarAlbuns(this.auth.usuario._id).subscribe(res =>{
      this.albuns = JSON.parse(res._body);
      console.log(this.albuns);
      this.setAlbunsFront();
    }, err => {
      console.error(err);
      this.openSnackBar('erro ao buscar imagens');
    })
  }

  setAlbunsFront()
  {
    
  }

  criarAlbuns()
  {
    this.router.navigate(['/photos']);;
  }

}
