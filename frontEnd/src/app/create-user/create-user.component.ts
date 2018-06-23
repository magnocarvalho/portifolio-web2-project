import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  form = new FormGroup(
    {
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );

  fazerLogin()
  {
    //comunica com o backend e aguarda a resposta.
  }
  criarLogin()
  {
    this.route.navigate(['/login']);
  }

}
