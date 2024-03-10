import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PHomeComponent } from './p-home/p-home.component';
import { PNavComponent } from './p-nav/p-nav.component';
import { PSoftwaresComponent } from './p-softwares/p-softwares.component';
import { MMaterialAngularModule } from './m-material-angular/m-material-angular/m-material-angular.module';
import { CSoftwareVersoesComponent } from './c-software-versoes/c-software-versoes.component';
import { CSoftwareTecnologiasComponent } from './c-software-tecnologias/c-software-tecnologias.component';
import { CSoftwareFormComponent } from './c-software-form/c-software-form.component';
import { CSelectItemComponent } from './c-select-item/c-select-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CAddItemComponent } from './c-add-item/c-add-item.component';
import { CDialogConfirmComponent } from './c-dialog-confirm/c-dialog-confirm.component';
import { CSoftwareVersoesFormComponent } from './c-software-versoes-form/c-software-versoes-form.component';
import { PEmpresasComponent } from './p-empresas/p-empresas.component';
import { CEmpresaFormComponent } from './c-empresa-form/c-empresa-form.component';
import { ClSoftwaresComponent } from './cl-softwares/cl-softwares.component';
import { ClEmpresasComponent } from './cl-empresas/cl-empresas.component';
import { ClContratosComponent } from './cl-contratos/cl-contratos.component';
import { PContratosComponent } from './p-contratos/p-contratos.component';
import { CContratoFormComponent } from './c-contrato-form/c-contrato-form.component';
import { PChamadosComponent } from './p-chamados/p-chamados.component';
import { ClChamadosComponent } from './cl-chamados/cl-chamados.component';
import { CChamadoFormComponent } from './c-chamado-form/c-chamado-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { PLoginComponent } from './p-login/p-login.component';
import { PGetInfoComponent } from './p-get-info/p-get-info.component';
import { InterceptionHttpService } from './services/interception-http.service';
import { PProfissionaisComponent } from './p-profissionais/p-profissionais.component';
import { ClProfissionaisComponent } from './cl-profissionais/cl-profissionais.component';
import { CProfissionalFormComponent } from './c-profissional-form/c-profissional-form.component';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
  provideNgxMask,
} from 'ngx-mask';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ClTimesComponent } from './cl-times/cl-times.component';
import { PTimesComponent } from './p-times/p-times.component';
import { CTimeFormComponent } from './c-time-form/c-time-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PHomeComponent,
    PNavComponent,
    PSoftwaresComponent,
    CSoftwareVersoesComponent,
    CSoftwareTecnologiasComponent,
    CSoftwareFormComponent,
    CSelectItemComponent,
    CAddItemComponent,
    CDialogConfirmComponent,
    CSoftwareVersoesFormComponent,
    PEmpresasComponent,
    CEmpresaFormComponent,
    ClSoftwaresComponent,
    ClEmpresasComponent,
    ClContratosComponent,
    PContratosComponent,
    CContratoFormComponent,
    PChamadosComponent,
    ClChamadosComponent,
    CChamadoFormComponent,
    PLoginComponent,
    PGetInfoComponent,
    PProfissionaisComponent,
    ClProfissionaisComponent,
    CProfissionalFormComponent,
    ClTimesComponent,
    PTimesComponent,
    CTimeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MMaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptionHttpService,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
