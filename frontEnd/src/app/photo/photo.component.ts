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
  public usuario: any;
  public id: String;
  
  ngOnInit() {
    this.usuario = this.user.getUsuario();
    this.id = this.usuario._id;
  }
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    photos: new FormControl()
  })
  imagens : any;

  foto(e) {
    const reader = new FileReader();
    const rawImg: File = e.target.files[0];
    let result: string;
    reader.onload = (img) => {
      this.imagens = reader.result;
    };
    reader.readAsDataURL(rawImg);


  }
  onSalvarPhotos(e) {
    e.preventDefault();
    var obj = {
      nome: this.form.get('nome').value,
      photos: this.imagens,
      userID: this.id
    }
    console.log(obj.userID);
    this.api.salvarFotos(obj).subscribe(res =>{
      console.log(res);
    })

  };

}
