import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sms } from '../interfaces/sms';
import { Response } from '../interfaces/response';




@Injectable({
  providedIn: 'root'
})
export class FiltradoService {

  private readonly API_TVSCROLLER = environment.API;
  private readonly API_TVSCROLLER_INTERNO = environment.API_INTERNO;

  constructor(private readonly api: HttpClient) { }

  getMessage(): Observable<Sms> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.get<Sms>(`${this.API_TVSCROLLER}/sms/`, httpOptions)
      .pipe(catchError((err) => this.handleError(err)), retry(3));
  }

  approveMessage(sms_id: number): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.put<Response>(`${this.API_TVSCROLLER}/sms/approve/${sms_id}`, null, httpOptions)
      .pipe(catchError((err) => this.handleError(err)), retry(3));
  }

  rejectMessage(sms_id: number): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.put<Response>(`${this.API_TVSCROLLER}/sms/reject/${sms_id}`, null, httpOptions)
      .pipe(catchError(this.handleError), retry(3));
  }


  getInternalMessage(): Observable<Sms> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.get<Sms>(`${this.API_TVSCROLLER_INTERNO}/sms/`, httpOptions)
      .pipe(catchError((err) => this.handleError(err)), retry(3));
  }

  approveInternalMessage(sms_id: number): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.put<Response>(`${this.API_TVSCROLLER_INTERNO}/sms/approve/${sms_id}`, null, httpOptions)
      .pipe(catchError((err) => this.handleError(err)), retry(3));
  }

  rejectInternalMessage(sms_id: number): Observable<Response> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + `${localStorage.getItem('user')}`
      })
    };
    return this.api.put<Response>(`${this.API_TVSCROLLER_INTERNO}/sms/reject/${sms_id}`, null, httpOptions)
      .pipe(catchError(this.handleError), retry(3));
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
