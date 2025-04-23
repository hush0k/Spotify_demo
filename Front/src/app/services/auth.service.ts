import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8000/api/token/', {username, password});
  }

  register(username: string, password: string) {
    return this.http.post<any>('http://localhost:8000/api/users/', {username, password});
  }

  refreshToken(): Observable<string> {
    const refresh = this.getRefreshToken();
    return this.http.post<{access: string}>('http://localhost:8000/api/token/refresh/', {refresh}).pipe(
      map(res => res.access),
    );
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  saveToken(token: string) {
    localStorage.setItem('access', token);
  }

  saveRefreshToken(refresh: string) {
    localStorage.setItem('refresh', refresh);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }


}
