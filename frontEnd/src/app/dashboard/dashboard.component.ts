import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  ngOnInit() {
    
  }

  criarAlbuns()
  {
    this.router.navigate(['/photos']);;
  }

}
