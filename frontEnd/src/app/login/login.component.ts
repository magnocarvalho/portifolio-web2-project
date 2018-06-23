import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private route: Router, private logar: AuthService, private snackEmail: MatSnackBar) { }

  ngOnInit() {
  }
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );
  openSnackBar(frase) {
    this.snackEmail.open(frase, 'OK', {
      duration: 6000
    });
  }

  fazerLogin(e)
  {
    //comunica com o backend e aguarda a resposta.
    e.preventDefault();
    this.logar.login({
      email: this.form.get('email').value,
      pass: this.form.get('pass').value
    }).subscribe(result => {
      console.log(result);
      this.route.navigate(['/photos']);
    }, err => {
      console.error(err);
      this.openSnackBar('Erro no login');
    });
  }
  criarLogin()
  {
    this.route.navigate(['/create-user']);
  }

}
