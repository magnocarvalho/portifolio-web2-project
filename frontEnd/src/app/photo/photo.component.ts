import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private api: ApiService, private user: AuthService, private snackEmail: MatSnackBar, private router: Router) { }
  public usuario: any;
  public id: String
  public namePhoto = [];
  public imagens = [];
  public photos: string[] = [];
  ngOnInit() {
    this.usuario = localStorage.getItem('id');
    this.id = localStorage.getItem('id');
  }
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    photos: new FormControl()
  })


  foto(e) {
    // const reader = new FileReader();
    
    for (let i = 0; i < e.target.files.length; i++) {

      this.salvarFotos(e.target.files[i], i);
      this.photos.push(e.target.files[i].name);
    }

    // let result: string;
    // reader.onload = (img) => {
    //   this.imagens = reader.result;
    // };
    // this.namePhoto = rawImg.name;
    // reader.readAsDataURL(rawImg);


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
  onSalvarPhotos(e) {
    e.preventDefault();
    var obj = {
      nome: this.form.get('nome').value,
      photo: this.imagens,
      userID: this.id,
      namePhoto: this.namePhoto
    }
    this.api.salvarFotos(obj).subscribe(res => {
      this.openSnackBar("fotos salvas com sucesso");
    }, err => {
      
      var tmp = JSON.parse(err._body);
      console.log(tmp);
      this.openSnackBar(tmp.message);
    });

  };
  openSnackBar(frase) {
    this.snackEmail.open(frase, 'OK', {
      duration: 6000
    });
  }
  verAlbuns()
  {
    this.router.navigate(['/dashboard']);
  }
  popPhoto(photo: string) {
    console.log(photo);
    this.photos = this.photos.filter(photoitem => photoitem !== photo);
    const pos = this.namePhoto.indexOf(p => p === photo);
    this.namePhoto = this.namePhoto.filter(np => np !== photo);
    this.imagens = this.imagens.filter((element, i) =>  i !== pos);
  }
}
