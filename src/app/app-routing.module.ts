import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { PHomeComponent } from './p-home/p-home.component';
import { PLoginComponent } from './p-login/p-login.component';
import { PNavComponent } from './p-nav/p-nav.component';
import { PProfissionaisComponent } from './p-profissionais/p-profissionais.component';
import { PTimesComponent } from './p-times/p-times.component';
import { PProjetosComponent } from './p-projetos/p-projetos.component';

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
        path: 'projetos',
        component: PProjetosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
