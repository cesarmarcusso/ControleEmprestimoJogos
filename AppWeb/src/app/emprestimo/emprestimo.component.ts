import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Emprestimo } from '../_models/emprestimo';
import { EmprestimoService } from '../_services/emprestimo.service';
import { AmigoService } from '../_services/amigo.service';
import { JogoService } from '../_services/jogo.service';
import { Amigo } from '../_models/amigo';
import { Observable, of } from 'rxjs';
import { Jogo } from '../_models/jogo';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  titulo = 'Cadastro de Emprestimos de Jogos';

  listaCboAmigos: Observable<Amigo[]>;
  idSelecaoCboAmigo = '';

  listaCboJogos: Observable<Jogo[]>;
  idSelecaoCboJogo = '';
  emprestimos: Emprestimo[];
  modoSalvar = 'post';
  emprestimoAux: Emprestimo;
  registerForm: FormGroup;
  bodyDeletarEmprestimo = '';


  dataEmprestimo: string;
  listaAmigosGride: Amigo[];
  listaJogosGride: Jogo[];


  // tslint:disable-next-line: variable-name
  _filtroEmprestimos: string;
  emprestimosFiltrados: Emprestimo[];
  get filtroEmprestimos(): string {
    return this._filtroEmprestimos;
  }
  set filtroEmprestimos(value: string){
    this._filtroEmprestimos = value;
    // se filtroEmprestimos estiver vazio
    this.emprestimosFiltrados = this.filtroEmprestimos ? this.FiltrarEmprestimos(this.filtroEmprestimos) : this.emprestimos;
  }

  constructor(private http: HttpClient,
              private emprestimosService: EmprestimoService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private amigosService: AmigoService,
              private jogosService: JogoService
              ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.getTodosJogos(); // todos
    this.getAmigos();
    this.getJogos(); // filtrada

    this.getEmprestimos();
    this.validation();
  }

  FiltrarEmprestimos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    if (this.emprestimos != null){
      return this.emprestimos.filter(
        emprestimo => emprestimo.nomejogo.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
    }
    else
    {
      return '';
    }
  }

  // tslint:disable-next-line: typedef
  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  // tslint:disable-next-line: typedef
  getEmprestimos() {
    this.emprestimosService.getAllEmprestimo().subscribe(
      // tslint:disable-next-line: variable-name
      (_emprestimos: Emprestimo[]) => {
          this.emprestimos = _emprestimos;
          this.emprestimosFiltrados = this.emprestimos;
          this.atualizarNomesAmigoJogo();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  atualizarNomesAmigoJogo() {
    console.log(this.emprestimosFiltrados );
    console.log(this.listaAmigosGride );
    console.log(this.listaJogosGride );

    // tslint:disable-next-line: prefer-for-of
    for (let a = 0; a < this.emprestimosFiltrados.length; a++){
      if (this.emprestimosFiltrados[a].id > 0){
        // tslint:disable-next-line: prefer-for-of
        for (let b = 0; b < this.listaAmigosGride.length; b++){
            // tslint:disable-next-line: prefer-const
            let a1 = this.listaAmigosGride[b].id;
            // tslint:disable-next-line: prefer-const
            let b1 = this.emprestimosFiltrados[a].idamigo;

            if (String(a1) === String(b1)){
            // if (this.listaAmigosGride[b].id === this.emprestimosFiltrados[a].idamigo){
              this.emprestimosFiltrados[a].nomeamigo = this.listaAmigosGride[b].nome;
              break;
            }
        }

        // tslint:disable-next-line: prefer-for-of
        for (let c = 0; c < this.listaJogosGride.length; c++){
          if (this.listaJogosGride[c].id === this.emprestimosFiltrados[a].idjogo){
            this.emprestimosFiltrados[a].nomejogo = this.listaJogosGride[c].nomejogo;
            break;
          }
        }
      }
    }

  }

  // tslint:disable-next-line: typedef
  validation() {
      this.registerForm = this.fb.group({
        idjogo: ['', Validators.required],
        idamigo: ['', Validators.required],
        dataEmprestimo: [''],
        nomejogo: [''],
        nomeamigo: ['']
      });
  }

   // funcoes do crud
   // tslint:disable-next-line: typedef
  salvarAlteracao(template: any) {

      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.emprestimoAux = Object.assign({}, this.registerForm.value);
          this.emprestimosService.postEmprestimo(this.emprestimoAux).subscribe(
            (novoEmprestimo: Emprestimo) => {
              template.hide();
              this.getEmprestimos();
              this.toastr.success('Registro inserido com sucesso!');
            }, error => {
              this.toastr.error('Erro ao inserir registro');
              console.log(error);
            });
        } else {
          this.emprestimoAux = Object.assign({ id: this.emprestimoAux.id }, this.registerForm.value);

          this.emprestimosService.putEmprestimo(this.emprestimoAux).subscribe(
            () => {
              template.hide();
              this.getEmprestimos();
              this.toastr.success('Registro alterado com sucesso !');
            }, error => {
              this.toastr.error('Erro ao alterar.: ${error}');
            }
          );
        }
      }
  }

    // tslint:disable-next-line: typedef
  novoEmprestimo(template: any) {
    this.idSelecaoCboAmigo = '';
    this.idSelecaoCboJogo = '';
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  editarEmprestimo(emprestimo: Emprestimo, template: any) {
    this.idSelecaoCboAmigo = String(emprestimo.idamigo);
    this.idSelecaoCboJogo = String(emprestimo.idjogo);
    console.log(this.idSelecaoCboAmigo);

    this.modoSalvar = 'put';
    this.openModal(template);
    this.emprestimoAux = Object.assign({}, emprestimo);
    this.registerForm.patchValue(this.emprestimoAux);
  }

  // tslint:disable-next-line: typedef
  excluirEmprestimo(emprestimo: Emprestimo, template: any) {
    this.openModal(template);
    this.emprestimoAux = emprestimo;
    this.bodyDeletarEmprestimo = `Tem certeza que deseja excluir o empréstimo : ${emprestimo.nomejogo}`;
  }

    // tslint:disable-next-line: typedef
  confirmeDelete(template: any) {
      this.emprestimosService.deleteEmprestimo(this.emprestimoAux.id).subscribe(
        () => {
            template.hide();
            this.getEmprestimos();
            this.toastr.success('Registro deletado com sucesso!');
          }, error => {
            this.toastr.error('Erro ao deletar registro!');
            console.log(error);
          }
      );
  }

  // tslint:disable-next-line: typedef
  getAmigos() {
    this.amigosService.getAllAmigo().subscribe(
      // tslint:disable-next-line: variable-name
      (_amigos: Amigo[]) => {
        this.listaAmigosGride = _amigos;
        this.listaCboAmigos = of(this.listaAmigosGride);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getJogos() {
    // usado para o preencher o combo filtrado comente quem nao tem emprestimo
    this.jogosService.getAllJogoLivres().subscribe(
      // tslint:disable-next-line: variable-name
      (_jogos: Jogo[]) => {
        this.listaCboJogos = of(_jogos);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getTodosJogos() {
    // usado para preencher o gride somente
    this.jogosService.getAllJogo().subscribe(
      // tslint:disable-next-line: variable-name
      (_jogos: Jogo[]) => {
        this.listaJogosGride = _jogos;
    }, error => {
      console.log(error);
    });
  }

}
