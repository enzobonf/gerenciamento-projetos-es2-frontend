import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PHomeComponent } from './p-home/p-home.component';
import { PNavComponent } from './p-nav/p-nav.component';
import { MMaterialAngularModule } from './m-material-angular/m-material-angular/m-material-angular.module';
import { CSelectItemComponent } from './c-select-item/c-select-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CAddItemComponent } from './c-add-item/c-add-item.component';
import { CDialogConfirmComponent } from './c-dialog-confirm/c-dialog-confirm.component';
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
import { COpenFilterButtonComponent } from './c-open-filter-button/c-open-filter-button.component';
import { ClProfissionalSelectModalComponent } from './cl-profissional-select-modal/cl-profissional-select-modal.component';
import { CProfissionalSelectItemComponent } from './c-profissional-select-item/c-profissional-select-item.component';
import { CTimeProfissionaisComponent } from './c-time-profissionais/c-time-profissionais.component';
import { PProjetosComponent } from './p-projetos/p-projetos.component';
import { ClProjetosComponent } from './cl-projetos/cl-projetos.component';
import { CProjetoFormComponent } from './c-projeto-form/c-projeto-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PHomeComponent,
    PNavComponent,
    CSelectItemComponent,
    CAddItemComponent,
    CDialogConfirmComponent,
    PLoginComponent,
    PGetInfoComponent,
    PProfissionaisComponent,
    ClProfissionaisComponent,
    CProfissionalFormComponent,
    ClTimesComponent,
    PTimesComponent,
    CTimeFormComponent,
    COpenFilterButtonComponent,
    ClProfissionalSelectModalComponent,
    CProfissionalSelectItemComponent,
    CTimeProfissionaisComponent,
    PProjetosComponent,
    ClProjetosComponent,
    CProjetoFormComponent,
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
