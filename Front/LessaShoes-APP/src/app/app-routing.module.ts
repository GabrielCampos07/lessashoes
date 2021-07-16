import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TenisComponent } from './components/tenis/tenis.component';
import { TenisaddComponent } from './components/tenis/tenisadd/tenisadd.component';
import { TenislistaComponent } from './components/tenis/tenislista/tenislista.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioslistaComponent } from './components/usuarios/usuarioslista/usuarioslista.component';
import { UsuariosaddComponent } from './components/usuarios/usuariosadd/usuariosadd.component';

import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { RegistrarComponent } from './components/user/registrar/registrar.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'usuarios', component: UsuariosComponent,
    children: [
      { path: 'lista', component: UsuarioslistaComponent},
      { path: 'adicionar', component : UsuariosaddComponent},
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'perfil', component: PerfilComponent}
    ],
  },
  {
    path: 'tenis',
    component: TenisComponent,
    children: [
      { path: 'detalhe/:id', component: TenisaddComponent },
      { path: 'detalhe', component: TenisaddComponent },
      { path: 'lista', component: TenislistaComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
