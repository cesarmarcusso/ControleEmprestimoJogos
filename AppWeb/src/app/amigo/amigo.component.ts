import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmigoService } from '../_services/amigo.service';
import { Amigo } from '../_models/amigo';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-amigo',
  templateUrl: './amigo.component.html',
  styleUrls: ['./amigo.component.css']
})
export class AmigoComponent implements OnInit {

  amigos: Amigo[];
  modoSalvar = 'post';
  amigoAux: Amigo;
  registerForm: FormGroup;
  bodyDeletarAmigo = '';
  titulo = 'Cadastro de Amigos';

  // tslint:disable-next-line: variable-name
  _filtroAmigos: string;
  amigosFiltrados: Amigo[];
  get filtroAmigos(): string {
    return this._filtroAmigos;
  }
  set filtroAmigos(value: string){
    this._filtroAmigos = value;
    // se filtroAmigos estiver vazio
    this.amigosFiltrados = this.filtroAmigos ? this.FiltrarAmigos(this.filtroAmigos) : this.amigos;
  }

  constructor(private http: HttpClient,
              private amigosService: AmigoService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getAmigos();
    this.validation();
  }

  FiltrarAmigos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    if (this.amigos != null){
      return this.amigos.filter(
        amigo => amigo.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
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
  getAmigos() {
    this.amigosService.getAllAmigo().subscribe(
      // tslint:disable-next-line: variable-name
      (_amigos: Amigo[]) => {
        this.amigos = _amigos;
        this.amigosFiltrados = this.amigos;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      apelido: [''],
      observacao: ['']
    });
  }

  // funcoes do crud
  // tslint:disable-next-line: typedef
  salvarAlteracao(template: any) {

    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.amigoAux = Object.assign({}, this.registerForm.value);
        this.amigosService.postAmigo(this.amigoAux).subscribe(
          (novoAmigo: Amigo) => {
            template.hide();
            this.getAmigos();
            this.toastr.success('Registro inserido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao inserir.: ${error}');
          });
      } else {
        this.amigoAux = Object.assign({ id: this.amigoAux.id }, this.registerForm.value);

        this.amigosService.putAmigo(this.amigoAux).subscribe(
          () => {
            template.hide();
            this.getAmigos();
            this.toastr.success('Registro alterado com sucesso !');
          }, error => {
            this.toastr.error('Erro ao alterar.: ${error}');
          }
        );
      }
    }
  }

  // tslint:disable-next-line: typedef
  novoAmigo(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  // tslint:disable-next-line: typedef
  editarAmigo(amigo: Amigo, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.amigoAux = Object.assign({}, amigo);
    this.registerForm.patchValue(this.amigoAux);
  }

  // tslint:disable-next-line: typedef
  excluirAmigo(amigo: Amigo, template: any) {
    if (this.amigosService.getAmigoPossuiEmprestimo(amigo.id)){
      this.toastr.info('Exclusão não permitida, possui empréstimo de jogo(s)');
    }
    else{
      this.openModal(template);
      this.amigoAux = amigo;
      this.bodyDeletarAmigo = `Tem certeza que deseja excluir o(a) : ${amigo.nome}, Código: ${amigo.id}`;
    }
  }

  // tslint:disable-next-line: typedef
  confirmeDelete(template: any) {
    this.amigosService.deleteAmigo(this.amigoAux.id).subscribe(
      () => {
          template.hide();
          this.getAmigos();
          this.toastr.success('Registro deletado com sucesso!');
        }, error => {
          this.toastr.error('Erro ao deletar registro!');
          console.log(error);
        }
    );
  }
}
