import { AppComponent } from './app.component';
import { TenisComponent } from './components/tenis/tenis.component';
import { NavComponent } from './Shared/nav/nav.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule  } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";

import { tenis } from './services/tenis.service';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './Shared/cabecalho/cabecalho.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TenisaddComponent } from './components/tenis/tenisadd/tenisadd.component';
import { TenislistaComponent } from './components/tenis/tenislista/tenislista.component';
import { TenisattComponent } from './components/tenis/tenisatt/tenisatt.component';
@NgModule({
  declarations: [
    AppComponent,
      TenisComponent,
      NavComponent,
      CabecalhoComponent,
      UsuariosComponent,
      DashboardComponent,
      TenisaddComponent,
      TenislistaComponent,
      TenisattComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
  }
    ),
  ],
  providers: [tenis],
  bootstrap: [AppComponent]
})
export class AppModule { }
