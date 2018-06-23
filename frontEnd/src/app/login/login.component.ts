import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  form = new FormGroup(
    {
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
    this.route.navigate(['/create-user']);
  }

}
