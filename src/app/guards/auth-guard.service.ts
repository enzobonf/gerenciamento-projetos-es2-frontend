import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true; // mudar aqui depois do teste

    if (this.appService.isAuthorized()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
