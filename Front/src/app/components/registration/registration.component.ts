import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  username = '';
  password = '';
  email = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  onRegister() {
    const user = {username: this.username,email: this.email, password: this.password};
    this.http.post<any>('http://localhost:8000/api/users/', user).subscribe({
      next: (res:any) => {
        console.log('Registration successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }

}
