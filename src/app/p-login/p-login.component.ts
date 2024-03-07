import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarConfig } from '../model/snack-bar.interface';
import { ApiService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-p-login',
  templateUrl: './p-login.component.html',
  styleUrls: ['./p-login.component.scss'],
})
export class PLoginComponent {
  constructor(
    private apiService: ApiService,
    private appService: AppService,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loading: boolean = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.maxLength(150)]],
    senha: [null, [Validators.maxLength(100)]],
  });

  ngOnInit(): void {
    this.appService.logout();
  }

  async submit() {
    if (this.loading) return;

    let { email, senha } = this.form.value;
    email = email.trim();

    this.setLoading(true);

    try {
      const token = await (
        await this.afAuth.signInWithEmailAndPassword(email, senha)
      ).user.getIdToken();

      this.appService.setLogin(token);

      const usuario = await this.apiService.getUsuarioAtual();
      this.appService.setLoginInfo(usuario);
      this.setLoading(false);

      this.router.navigate(['/']);
    } catch (e: any) {
      this.setLoading(false);
      this.showSnackBar('Email ou senha incorretos', 'Ok', 'error');
    }

    this.setLoading(false);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.appService.setLoading(this.loading);
  }

  showSnackBar(message: string, action: string, type: 'success' | 'error') {
    this.appService.showSnackBar(message, action, type);
  }
}
