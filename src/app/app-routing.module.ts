import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { PChamadosComponent } from './p-chamados/p-chamados.component';
import { PContratosComponent } from './p-contratos/p-contratos.component';
import { PEmpresasComponent } from './p-empresas/p-empresas.component';
import { PHomeComponent } from './p-home/p-home.component';
import { PLoginComponent } from './p-login/p-login.component';
import { PNavComponent } from './p-nav/p-nav.component';
import { PSoftwaresComponent } from './p-softwares/p-softwares.component';
import { PProfissionaisComponent } from './p-profissionais/p-profissionais.component';
import { PTimesComponent } from './p-times/p-times.component';

const routes: Routes = [
  {
    path: 'login',
    component: PLoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: '',
    component: PNavComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'inicio',
        component: PHomeComponent,
      },
      {
        path: 'profissionais',
        component: PProfissionaisComponent,
      },
      {
        path: 'times',
        component: PTimesComponent,
      },
      {
        path: 'empresas',
        component: PEmpresasComponent,
      },
      {
        path: 'contratos',
        component: PContratosComponent,
      },
      {
        path: 'chamados',
        component: PChamadosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
