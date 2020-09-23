import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://localhost:44311/api/Usuario/';
  // tslint:disable-next-line: variable-name
  username_: string;

  constructor(
              private http: HttpClient,
              private toastr: ToastrService) {}

  // tslint:disable-next-line: typedef
  login(usuario: any){
    localStorage.removeItem('logado');

    return this.http.post(`${this.baseURL}`, usuario).pipe(
      map((response: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        const usu = response;

        if (usu && usu.username !== '' && usu.username !== null) {
          this.toastr.success('logado com sucesso!');
          this.username_ = usu.username;
          localStorage.setItem('logado', this.username_);
        } else {
          this.toastr.error('Usuário/Senha inválida !');
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  loggedIn(){
    // tslint:disable-next-line: variable-name
    const nomeLogin = localStorage.getItem('logado');
    return nomeLogin !== '' && nomeLogin !== null; // se true é pq tem usuario
  }

}
