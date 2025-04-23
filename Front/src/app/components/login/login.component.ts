import { Component, Output, EventEmitter  } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  // onLogin() {
  //   const body = {username: this.username, password: this.password};
  //   this.http.post<any>('http://localhost:8000/api/token/', body).subscribe({
  //     next: (res:any) => {
  //       localStorage.setItem('access', res.access);
  //       localStorage.setItem('refresh', res.refresh);
  //       this.isLoggedIn.set(true);
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error('Login failed', err);
  //       alert('Login failed');
  //     },
  //   });
  // }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access);
        this.authService.saveRefreshToken(res.refresh);
        this.authService.isLoggedIn.set(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Login failed. Invalid username or password');
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

}
