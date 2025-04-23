import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const body = {username: this.username, password: this.password};
    this.http.post<any>('http://localhost:8000/api/token/', body).subscribe({
      next: (res:any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed');
      },
    });
  }

}
