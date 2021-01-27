import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> | UrlTree {
    const isAdmin = this.authService.getIsAdmin();
    if (!isAdmin) {
      return this.router.createUrlTree(['/account/login']);
    }
    return isAdmin;
  }
}
