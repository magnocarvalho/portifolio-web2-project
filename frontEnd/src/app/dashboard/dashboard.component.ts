import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private snackbar: MatSnackBar, private dialog: MatDialog) { }
  public albuns: any;
  public url = '';
  public photos: any;
  public fotosAlbum = [];
  public listaFotos = false;


  ngOnInit() {
    this.url = this.api.IMG;
    this.carregarAlbuns();
  }

  openSnackBar(frase) {
    this.snackbar.open(frase, 'OK', {
      duration: 6000
    });
  }

  carregarAlbuns() {
    this.api.carregarAlbuns(this.auth.usuario._id).subscribe(res => {
      this.albuns = JSON.parse(res._body);
      console.log(this.albuns);
    }, err => {
      console.error(err);
      this.openSnackBar('erro ao buscar imagens');
    })
  }
  openDialog() {
    
  }
  voltarAlbuns() {
    this.carregarAlbuns();
    this.fotosAlbum.pop();
    this.listaFotos = false;
  }
  deletarFoto(f) {
    console.log(f);
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
    width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:' + result);
      if(result != false)
      {
        var obj = {
          id: this.photos._id,
          name: f 
        }
        console.log(obj);
        this.api.apagarFoto(obj).subscribe(res => {
          this.openSnackBar('foto deletada com sucesso');
          this.fotosAlbum.pop();
          this.selecionaAlbum(this.photos._id);
        }, err => {
          console.error(err);
          this.openSnackBar('foto nao foi deletada');
        })
      }
    });
  }
  selecionaAlbum(id) {
    this.api.carregarAlbum(id).subscribe(res => {
      this.photos = JSON.parse(res._body);
      this.fotosAlbum.push(this.photos.namePhotos);
      console.log(this.fotosAlbum);
      this.listaFotos = true;
    }, err => {
      console.error(err);
      this.openSnackBar('erro ao buscar fotos');
    })
  }

  criarAlbuns() {
    this.router.navigate(['/photos']);;
  }

}
