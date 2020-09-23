import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmigoComponent } from './amigo/amigo.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { JogoComponent } from './jogo/jogo.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';

const routes: Routes = [
  { path: 'Amigos', component: AmigoComponent },
  { path: 'Jogos', component: JogoComponent },
  { path: 'Emprestimos', component: EmprestimoComponent },
  { path: 'Principal', component: PrincipalComponent},
  { path: 'Login', component: LoginComponent},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
