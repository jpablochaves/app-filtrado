import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLogged
      .pipe(
        map((login: boolean) => login ? true : this.router.parseUrl('/login'))
      );
  }

}
