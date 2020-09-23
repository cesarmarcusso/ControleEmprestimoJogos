import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  estaLogado: string;

  constructor(public router: Router,
              public authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  loggedIn(){    // logado
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('logado');
    this.router.navigate(['/Login']);
  }

  // tslint:disable-next-line: typedef
  userName() {
    return localStorage.getItem('logado');
  }

  // tslint:disable-next-line: typedef
  direciona(){
    this.estaLogado = localStorage.getItem('logado');
    if (this.estaLogado !== '' && this.estaLogado !== null){
      this.router.navigate(['/Principal']);
    }else{
      this.logout();
    }
  }
}
