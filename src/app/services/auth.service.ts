import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map, of, BehaviorSubject, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_TVSCROLLER = environment.API;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router, private readonly api: HttpClient) { }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public logout(redirect: string): void {
    this._router.navigate([redirect]);
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  public Login(username: string, password: string): Observable<Usuario | void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };
    return this.api.get<Usuario>(`${this.API_TVSCROLLER}/users/${username}`, httpOptions)
      .pipe(
        map((resp: Usuario) => {
          this.authenticateUser(username, password);
          this.loggedIn.next(true);
          return resp;
        }),
        catchError((err) => this.handleError(err)), retry(3));
  }

  private authenticateUser(username: string, password: string): void {
    localStorage.setItem('user', btoa(`${username}:${password}`));
    // console.log("Authenticated User, Token: ", user_data);
  }

  private handleError(error: HttpErrorResponse) {
    // User not auth
    if (error.status === 401) {
      return throwError(() => new Error('401 error: User is Unauthorized!'))
    } else {
      return throwError(() => new Error(`${error.status} error: ${error.error}`));
    }
  }

}
