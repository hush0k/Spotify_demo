import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MusicPlayerComponent} from './components/music-player/music-player.component';
import {authGuard} from './auth.guard';
import {RegistrationComponent} from './components/registration/registration.component';
import {PremiumComponent} from './pages/premium/premium.component';
import {DownloadComponent} from './pages/download/download.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'player', component: MusicPlayerComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'premium', component: PremiumComponent},
  { path: 'download', component: DownloadComponent},
  { path: '**', component: NotFoundComponent},
];
