import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8000/api/token/', {username, password});
  }

  saveToken(token: string) {
    localStorage.setItem('access', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('access');
  }


}
