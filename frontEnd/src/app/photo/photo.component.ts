import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private api: ApiService, private user: AuthService, private snackEmail: MatSnackBar) { }
  public usuario: any;
  public id: String
  public namePhoto = [];
  public imagens = [];
  
  ngOnInit() {
    this.usuario = this.user.getUsuario();
    this.id = this.usuario._id;
  }
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    photos: new FormControl()
  })
 

  foto(e) {
    // const reader = new FileReader();
    for (let i = 0; i< e.target.files.length; i++) {
      
     this.salvarFotos(e.target.files[i], i);

    }
    // let result: string;
    // reader.onload = (img) => {
    //   this.imagens = reader.result;
    // };
    // this.namePhoto = rawImg.name;
    // reader.readAsDataURL(rawImg);


  }
  salvarFotos(rawImg: File, i)
  {
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
    console.log(obj.userID);
    this.api.salvarFotos(obj).subscribe(res =>{

      var tmp = JSON.parse(res._body);
      console.log(tmp);
      if(tmp.status == 500)
      {
       this.openSnackBar(res.message);
      }
    })

  };
  openSnackBar(frase) {
    this.snackEmail.open(frase, 'OK', {
      duration: 6000
    });
  }

}
