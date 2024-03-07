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
        path: 'softwares',
        component: PSoftwaresComponent,
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
