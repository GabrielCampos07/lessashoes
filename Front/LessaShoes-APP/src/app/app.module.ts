import { AppComponent } from './app.component';

import { CabecalhoComponent } from './Shared/cabecalho/cabecalho.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NavComponent } from './Shared/nav/nav.component';

import { PerfilComponent } from './components/user/perfil/perfil.component';

import { LoginComponent } from './components/user/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserComponent } from './components/user/user.component';
import { RegistrarComponent } from './components/user/registrar/registrar.component';

import { TenisComponent } from './components/tenis/tenis.component';
import { TenisaddComponent } from './components/tenis/tenisadd/tenisadd.component';
import { TenislistaComponent } from './components/tenis/tenislista/tenislista.component';

import { UsuarioslistaComponent } from './components/usuarios/usuarioslista/usuarioslista.component';
import { UsuariosaddComponent } from './components/usuarios/usuariosadd/usuariosadd.component';

import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { tenis } from './services/tenis.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CabecalhoComponent,
    DashboardComponent,
    TenisComponent,
    TenisaddComponent,
    TenislistaComponent,
    UsuariosComponent,
    UsuarioslistaComponent,
    UsuariosaddComponent,
    UserComponent,
    LoginComponent,
    RegistrarComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule,
    CollapseModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [tenis],
  bootstrap: [AppComponent],
})
export class AppModule {}
