// Libs
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Interfaces
import { environment } from '../../../../environments/environment';
import { User, FbAuthResponse, FbAuthRequest } from '../../../shared/interfaces';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

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
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {

      const expiresDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
