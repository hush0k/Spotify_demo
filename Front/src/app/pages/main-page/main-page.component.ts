import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../../components/navigation/navbar.component';
import {LibraryComponent} from '../../components/library/library.component';
import {MainComponent} from '../../components/main/main.component';
import {PreviewComponent} from '../../components/preview/preview.component';
import {LoginComponent} from '../../components/login/login.component';
import {MusicPlayerComponent} from '../../components/music-player/music-player.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  imports: [
    NavbarComponent,
    LibraryComponent,
    MainComponent,
    PreviewComponent,
    LoginComponent,
    MusicPlayerComponent,
    FooterComponent,
    NgIf
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  router = inject(Router);
  constructor(protected auth: AuthService) {}

  onLogout() {
    this.auth.logout();
    window.location.reload();
  }

}
