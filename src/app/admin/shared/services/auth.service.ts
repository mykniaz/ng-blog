// RxJs
import {catchError, tap} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
// Interfaces
import { environment } from '../../../../environments/environment';
import { User, FbAuthResponse, FbAuthRequest } from '../../../shared/interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>();

  get token(): string {
    const expiresDate = new Date(localStorage.getItem('fb-token-exp'));

    if (new Date() > expiresDate) {
      this.logout();

      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FbAuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

    const requestBody: FbAuthRequest = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post<FbAuthResponse>(url, requestBody)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  setToken(response: FbAuthResponse | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Password is invalid.');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Email is invalid.');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found.');
        break;
      default:
        this.error$.next('Something goes wrong.');
        break;
    }

    return throwError(error);
  }
}
