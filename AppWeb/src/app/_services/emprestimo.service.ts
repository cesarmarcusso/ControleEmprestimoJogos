import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emprestimo } from '../_models/emprestimo';
import { Jogo } from '../_models/jogo';
import { Amigo } from '../_models/amigo';
import { AmigoService } from '../_services/amigo.service';
import { JogoService } from '../_services/jogo.service';
import { EmprestimoOrigem } from '../_models/emprestimoOrigem';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  baseURL = 'https://localhost:44311/api/Emprestimo';
  entityOrigem = new EmprestimoOrigem();

  constructor(private http: HttpClient
    ) { }

  getAllEmprestimo(): Observable<Emprestimo[]> {
      return this.http.get<Emprestimo[]>(this.baseURL);
  }

  // tslint:disable-next-line: typedef
  postEmprestimo(emprestimo: Emprestimo) {
      // tslint:disable-next-line: prefer-const
      this.entityOrigem = new EmprestimoOrigem();
      this.entityOrigem.idamigo = emprestimo.idamigo;
      this.entityOrigem.idjogo = emprestimo.idjogo;
      this.entityOrigem.dataEmprestimo = emprestimo.dataEmprestimo;
      console.log(emprestimo);
      return this.http.post(this.baseURL, this.entityOrigem);
  }

  // tslint:disable-next-line: typedef
  putEmprestimo(emprestimo: Emprestimo) {
      // tslint:disable-next-line: prefer-const
      this.entityOrigem = new EmprestimoOrigem();
      this.entityOrigem.id = emprestimo.id;
      this.entityOrigem.idamigo = emprestimo.idamigo;
      this.entityOrigem.idjogo = emprestimo.idjogo;
      this.entityOrigem.dataEmprestimo = emprestimo.dataEmprestimo;
      return this.http.put(this.baseURL, this.entityOrigem);
  }

  // tslint:disable-next-line: typedef
  deleteEmprestimo(id: number) {
      return this.http.delete(`${this.baseURL}/${id}`);
   }

}
