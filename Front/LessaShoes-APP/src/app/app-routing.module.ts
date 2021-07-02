import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TenisComponent } from './components/tenis/tenis.component';
import { TenisaddComponent } from './components/tenisadd/tenisadd.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path : 'tenis', component: TenisComponent},
  { path : 'dashboard', component: DashboardComponent},
  { path : 'tenisAdd', component: TenisaddComponent},
  { path : 'usuarios', component: UsuariosComponent},
  { path : '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path : '**', redirectTo: 'dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
