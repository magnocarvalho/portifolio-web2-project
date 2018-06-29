import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }
  public albuns: any;
  public url = '';
  public photos: any;
  public fotosAlbum = [];
  public listaFotos = false;
  public id: String
  public namePhoto = [];
  public imagens = [];
  public usuario: any;
  public novasFotos = false;
  public idDoAlbum = '';

  ngOnInit() {
    this.url = this.api.IMG;
    this.usuario = this.auth.getUsuario();
    this.id = localStorage.getItem('id');
    this.carregarAlbuns();
   
  }

  openSnackBar(frase) {
    this.snackbar.open(frase, 'OK', {
      duration: 6000
    });
  }

  carregarAlbuns() {
    this.api.carregarAlbuns(this.id).subscribe(res => {
      this.albuns = JSON.parse(res._body);
      console.log(this.albuns);
    }, err => {
      console.error(err);
      this.openSnackBar('erro ao buscar imagens');
    })
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
          _id: this.idDoAlbum,
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
    console.log(this.fotosAlbum);
    console.log(id);
    this.api.carregarAlbum(id).subscribe(res => {
      this.photos = JSON.parse(res._body);
      this.idDoAlbum = id;
      console.log('id do album ' + this.idDoAlbum);
      this.fotosAlbum.push(this.photos.namePhotos);
      console.log(this.fotosAlbum);
      this.listaFotos = true;
    }, err => {
      console.error(err);
      this.openSnackBar('erro ao buscar fotos');
    })
  }
  addFotos(){
    this.novasFotos = true;
  }
  atualizarFotos(e){
    for (let i = 0; i < e.target.files.length; i++) {

      this.salvarFotos(e.target.files[i], i);

    }
  }
  enviarFotos()
  {
    var obj = {
      id: this.photos._id,
      photo: this.imagens,
      namePhoto: this.namePhoto,
      nome: this.photos.nome,
      userID: this.id
    }
    this.api.adicionarFotos(obj).subscribe(sub =>{
      console.log(sub);
      this.openSnackBar('Novas fotos add ao album ' + this.photos.nome);
      this.fotosAlbum.pop();
      this.selecionaAlbum(obj.id);
      this.imagens.pop();
      this.namePhoto.pop();

    }, err =>{
      console.log(err);
      this.openSnackBar('erro ao add novas fotos ');
    })
  }
  salvarFotos(rawImg: File, i) {
    let result: string;
    const reader = new FileReader();
    reader.onload = (img) => {
      this.imagens.push(reader.result);
    };
    this.namePhoto.push(rawImg.name);
    reader.readAsDataURL(rawImg);
  }

  criarAlbuns() {

    this.router.navigate(['/photos']);
  }
  logout() {
    localStorage.removeItem('id');
    //debugger;
    this.router.navigate(['/login']);
  }
}
