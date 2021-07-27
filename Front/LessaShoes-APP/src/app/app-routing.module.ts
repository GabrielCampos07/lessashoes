import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { DashboardComponent} from './components/paginainicial/paginainicial.component';

import { TenisComponent } from './components/tenis/tenis.component';
import { TenisaddComponent } from './components/tenis/tenisadd/tenisadd.component';
import { TenislistaComponent } from './components/tenis/tenislista/tenislista.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegistrarComponent } from './components/user/registrar/registrar.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent }
    ],
  },
  {
    path: 'tenis',
    component: TenisComponent,
    children: [
      { path: 'detalhe/:id', component: TenisaddComponent, canActivate: [AuthGuard] },
      { path: 'detalhe', component: TenisaddComponent, canActivate: [AuthGuard] },
      { path: 'lista', component: TenislistaComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'paginainicial', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'paginainicial', pathMatch: 'full' },
  { path: '**', redirectTo: 'paginainicial', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
