import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Jogo } from '../_models/jogo';
import { JogoService } from '../_services/jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogos: Jogo[];
  modoSalvar = 'post';
  jogoAux: Jogo;
  registerForm: FormGroup;
  bodyDeletarJogo = '';
  titulo = 'Cadastro de Jogos';

  // tslint:disable-next-line: variable-name
  _filtroJogos: string;
  jogosFiltrados: Jogo[];
  get filtroJogos(): string {
    return this._filtroJogos;
  }
  set filtroJogos(value: string){
    this._filtroJogos = value;
    // se filtroJogos estiver vazio
    this.jogosFiltrados = this.filtroJogos ? this.FiltrarJogos(this.filtroJogos) : this.jogos;
  }

  constructor(private http: HttpClient,
              private jogosService: JogoService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getJogos();
    this.validation();
  }

  FiltrarJogos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    if (this.jogos != null){
      return this.jogos.filter(
        jogo => jogo.nomejogo.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
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
  getJogos() {
    this.jogosService.getAllJogo().subscribe(
      // tslint:disable-next-line: variable-name
      (_jogos: Jogo[]) => {
        this.jogos = _jogos;
        this.jogosFiltrados = this.jogos;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  validation() {
    this.registerForm = this.fb.group({
      nomejogo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      genero: [''],
      observacao: ['']
    });
  }

  // funcoes do crud
  // tslint:disable-next-line: typedef
  salvarAlteracao(template: any) {

    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.jogoAux = Object.assign({}, this.registerForm.value);
        this.jogosService.postJogo(this.jogoAux).subscribe(
          (novoJogo: Jogo) => {
            template.hide();
            this.getJogos();
            this.toastr.success('Registro inserido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao inserir.: ${error}');
          });
      } else {
        this.jogoAux = Object.assign({ id: this.jogoAux.id }, this.registerForm.value);

        this.jogosService.putJogo(this.jogoAux).subscribe(
          () => {
            template.hide();
            this.getJogos();
            this.toastr.success('Registro alterado com sucesso !');
          }, error => {
            this.toastr.error('Erro ao alterar.: ${error}');
          }
        );
      }
    }
  }

  // tslint:disable-next-line: typedef
  novoJogo(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  editarJogo(jogo: Jogo, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.jogoAux = Object.assign({}, jogo);
    this.registerForm.patchValue(this.jogoAux);
  }

  // tslint:disable-next-line: typedef
  excluirJogo(jogo: Jogo, template: any) {
    if (this.jogosService.getJogoEmprestado(jogo.id)){
      this.toastr.info('Exclusão não permitida, jogo emprestado');
    }
    else{
      this.openModal(template);
      this.jogoAux = jogo;
      this.bodyDeletarJogo = `Tem certeza que deseja excluir o(a) : ${jogo.nomejogo}, Código: ${jogo.id}`;
    }
  }

  // tslint:disable-next-line: typedef
  confirmeDelete(template: any) {
    this.jogosService.deleteJogo(this.jogoAux.id).subscribe(
      () => {
          template.hide();
          this.getJogos();
          this.toastr.success('Registro deletado com sucesso!');
        }, error => {
          this.toastr.error('Erro ao deletar registro!');
          console.log(error);
        }
    );
  }
}
