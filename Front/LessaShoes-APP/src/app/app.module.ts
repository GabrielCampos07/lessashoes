import { AppComponent } from './app.component';
import { TenisComponent } from './components/tenis/tenis.component';
import { NavComponent } from './Shared/nav/nav.component';
import { TitulosComponent } from './Shared/titulo/titulos/titulos.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule  } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';

import { tenis } from './services/tenis.service';
@NgModule({
  declarations: [
    AppComponent,
      TenisComponent,
      NavComponent,
      TitulosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule,
    CollapseModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [tenis],
  bootstrap: [AppComponent]
})
export class AppModule { }
