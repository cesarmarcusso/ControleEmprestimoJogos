import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// importados para o projeto
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormatadaPipePipe } from './_helps/DataFormatadaPipe.pipe';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // menu drop
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // componente de data
import { ToastrModule } from 'ngx-toastr';
import { FormatoMoedaPipePipe } from './_helps/FormatoMoedaPipe.pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TituloComponent } from './_titulo/titulo/titulo.component';

import { AmigoService } from './_services/amigo.service';

// para configurar os valores em reais
import { NgSelectModule } from '@ng-select/ng-select';

import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { AmigoComponent } from './amigo/amigo.component';
import { JogoComponent } from './jogo/jogo.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';
registerLocaleData(pt, 'pt-BR');
///

@NgModule({
   declarations: [
      AppComponent,
      NavComponent, // inserido
      DataFormatadaPipePipe, // inserido
      FormatoMoedaPipePipe,
      PrincipalComponent,
      TituloComponent,
      LoginComponent,
      AmigoComponent,
      JogoComponent,
      EmprestimoComponent
      
   ],
   imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(), // inserido
      BsDropdownModule.forRoot(), // inserido
      TooltipModule.forRoot(), // inserido
      ModalModule.forRoot(), // inserido
      AppRoutingModule,
      HttpClientModule, // inserido
      FormsModule, // inserido
      ReactiveFormsModule,  // importado para trabalhar com formularios
      BrowserAnimationsModule, // inserido
      ToastrModule.forRoot({  // mensagem gravacao
         timeOut: 1000,
         preventDuplicates: true,
         progressBar: true
      }),
      CurrencyMaskModule, // valores monetarios cadastro
      NgSelectModule
   ],
   providers: [
      // ProtestoService, // inserido
      AmigoService,
      {provide: LOCALE_ID, useValue: 'pt-BR'}, // para valores em reais
      {provide: DEFAULT_CURRENCY_CODE, useValue: 'pt-BR'}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
