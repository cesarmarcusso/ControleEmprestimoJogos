import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../_models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseURL = 'https://localhost:44311/api/Usuario';

  constructor(private http: HttpClient) { }

  getAllProtesto(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL);
  }

  // tslint:disable-next-line: typedef
  getUsuarioPorLogin(login: string) {
    return this.http.get<Usuario>(`${this.baseURL}/${login}`);
  }
}
