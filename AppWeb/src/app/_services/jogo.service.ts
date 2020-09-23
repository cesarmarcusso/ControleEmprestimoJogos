import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../_models/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  baseURL = 'https://localhost:44311/api/Jogo';
  disponiveis = 'ok';
  // tslint:disable-next-line: variable-name
  jogo_ = new Observable<Jogo[]>();
  jogoEmprestado: boolean;

  constructor(private http: HttpClient) { }

  getAllJogoLivres(): Observable<Jogo[]> {
    // traz somente os que nao estão emprestados (livres)
    return this.http.get<Jogo[]>(`${this.baseURL}/getlivres/${this.disponiveis}`);
  }

  getJogoEmprestado(idJogo: any): boolean {
    this.jogo_ = this.http.get<Jogo[]>(`${this.baseURL}/${idJogo}`);
    this.jogoEmprestado = false;

    this.jogo_.forEach(e => {
      if (e.length > 0){
        this.jogoEmprestado = true;
      }
    });
    return this.jogoEmprestado;
  }

  // getJogoPorId(idJogo: any): Observable<Jogo[]> {
  //  return this.http.get<Jogo[]>(`${this.baseURL}/${idJogo}`);
  // }

  getAllJogo(): Observable<Jogo[]> {
      return this.http.get<Jogo[]>(this.baseURL);
  }

  // tslint:disable-next-line: typedef
  postJogo(jogo: Jogo) {
      return this.http.post(this.baseURL, jogo);
  }

  // tslint:disable-next-line: typedef
  putJogo(jogo: Jogo) {
      return this.http.put(this.baseURL, jogo);
  }

  // tslint:disable-next-line: typedef
  deleteJogo(id: number) {
      return this.http.delete(`${this.baseURL}/${id}`);
   }

}
