import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navigation/navbar.component";
import {LibraryComponent} from './components/library/library.component';
import {AlbumComponent} from './components/album/album.component';
import {MainComponent} from './components/main/main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LibraryComponent, AlbumComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Spotify';
}
