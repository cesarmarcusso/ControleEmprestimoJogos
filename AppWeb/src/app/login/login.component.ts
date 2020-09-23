import { Component, OnInit } from '@angular/core';
import { Usuario } from '../_models/Usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(private authService: AuthService,
              public router: Router,
              private toastr: ToastrService) { }

  // tslint:disable-next-line:  typedef
  ngOnInit() {
    if (localStorage.getItem('logado') !== null){
      this.router.navigate(['/Principal']);
    }
  }

  // tslint:disable-next-line: typedef
  login(){
    this.authService.login(this.usuario).subscribe(
      () => {
        if (localStorage.getItem('logado') !== ''){
          this.router.navigate(['/Principal']);
        }else{
          this.router.navigate(['/Login']);
        }
      },
      error => {
        this.toastr.error('Usuário/Senha inválidos.');
      }
    );
  }
}
