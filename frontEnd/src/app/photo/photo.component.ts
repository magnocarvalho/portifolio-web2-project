import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private api: ApiService, private user: AuthService) { }
  usuario: any;
  ngOnInit() {
    this.usuario = this.user.getUsuario;
  }
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    photos: new FormControl()
  })
  imagens = [];

  foto(e) {
    const reader = new FileReader();
    const rawImg: File = e.target.files[0];
    let result: string;
    reader.onload = (img) => {
      this.imagens.push([reader.result]);
    };
    reader.readAsDataURL(rawImg);


  }
  onSalvarPhotos(e) {
    e.preventDefault();
    var obj = {
      nome: this.form.get('nome').value,
      photos: this.imagens,
      userID: this.usuario._id
    }
    this.api.salvarFotos(obj).subscribe(res =>{
      console.log(res);
    })

  };

}
