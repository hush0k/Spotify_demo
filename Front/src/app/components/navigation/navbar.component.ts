import {Component, inject, Input} from '@angular/core';
import {NgOptimizedImage, CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [
    NgOptimizedImage, CommonModule
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
  constructor(protected auth: AuthService) {}

  onLogout() {
    this.auth.logout();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login']);
  }

  singUp() {
    this.router.navigate(['/register']);
  }

  premium() {
    this.router.navigate(['/premium']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  download() {
    this.router.navigate(['/download']);
  }
}
