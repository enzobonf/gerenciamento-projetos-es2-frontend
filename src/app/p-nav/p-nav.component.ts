import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-p-nav',
  templateUrl: './p-nav.component.html',
  styleUrls: ['./p-nav.component.scss'],
})
export class PNavComponent {
  menu_lateral = true;
  menus: {
    nome: string;
    link: string;
    icon: string;
  }[] = [];

  nome_usuario = '';

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.nome_usuario = this.appService.getNomeUsuario();
    console.log(this.nome_usuario);
    this.setMenus();
  }

  setMenus() {
    this.menus = [
      {
        nome: 'Início',
        link: '/inicio',
        icon: 'home',
      },
      {
        nome: 'Profissionais',
        link: '/profissionais',
        icon: 'person',
      },
      {
        nome: 'Times',
        link: '/times',
        icon: 'groups',
      },
      {
        nome: 'Contratos',
        link: '/contratos',
        icon: 'edit_document',
      },
      {
        nome: 'Chamados',
        link: '/chamados',
        icon: 'notification_important',
      },
    ];
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  getVoltar() {
    return window.innerWidth < 600;
  }

  logout() {
    this.appService.logout();
  }
}
