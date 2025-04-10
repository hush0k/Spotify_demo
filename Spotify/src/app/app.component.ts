import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navigation/navbar.component";
import {LibraryComponent} from './components/library/library.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Spotify';
}
