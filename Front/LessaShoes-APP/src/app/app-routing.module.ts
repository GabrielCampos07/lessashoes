import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TenisComponent } from './components/tenis/tenis.component';
import { TenisaddComponent } from './components/tenis/tenisadd/tenisadd.component';
import { TenislistaComponent } from './components/tenis/tenislista/tenislista.component';
import { TenisattComponent } from './components/tenis/tenisatt/tenisatt.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {
    path : 'tenis', component: TenisComponent,
    children : [
      { path : 'adicionar', component : TenisaddComponent },
      { path : 'lista', component : TenislistaComponent },
      { path : 'atualizar', component : TenisattComponent }
    ]
  },
  { path : 'dashboard', component: DashboardComponent},
  { path : 'usuarios', component: UsuariosComponent},
  { path : '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path : '**', redirectTo: 'dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
