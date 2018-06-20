import { Component, OnInit } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private rotas: Router) { }

  ngOnInit() {
    this.rotas.navigate(['/login']);
  }

}
