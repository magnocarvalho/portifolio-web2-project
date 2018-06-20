import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  // form = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
  // });

  // obj = {
  //   email: this.form.get('email').value,
  //   pass: this.form.get('pass').value
  // }

  goToLogin(e)
  {

  }

}
