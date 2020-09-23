import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amigo } from '../_models/amigo';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  baseURL = 'https://localhost:44311/api/Amigo';
  // tslint:disable-next-line: variable-name
  amigo_ = new Observable<Amigo[]>();
  possuiEmprestimo: boolean;

  constructor(private http: HttpClient) { }

  getAllAmigo(): Observable<Amigo[]> {
      return this.http.get<Amigo[]>(this.baseURL);
  }

  getAmigoPossuiEmprestimo(idAmigo: any): boolean {
    this.amigo_ = this.http.get<Amigo[]>(`${this.baseURL}/${idAmigo}`);
    this.possuiEmprestimo = false;

    this.amigo_.forEach(e => {
      if (e.length > 0){
        this.possuiEmprestimo = true;
      }
    });
    return this.possuiEmprestimo;
  }

  // tslint:disable-next-line: typedef
  postAmigo(amigo: Amigo) {
      return this.http.post(this.baseURL, amigo);
  }

  // tslint:disable-next-line: typedef
  putAmigo(amigo: Amigo) {
      return this.http.put(this.baseURL, amigo);
  }

  // tslint:disable-next-line: typedef
  deleteAmigo(id: number) {
      return this.http.delete(`${this.baseURL}/${id}`);
   }
}
