import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  // Add other response properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return of(!!localStorage.getItem('token'));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
