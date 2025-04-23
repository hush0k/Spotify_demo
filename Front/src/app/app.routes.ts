import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MusicPlayerComponent} from './components/music-player/music-player.component';
import {authGuard} from './auth.guard';
import {RegistrationComponent} from './components/registration/registration.component';

export const routes: Routes = [
  // { path: 'login', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainPageComponent, canActivate: [authGuard] },
  { path: 'player', component: MusicPlayerComponent},
  { path: 'register', component: RegistrationComponent }
];
