import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navigation/navbar.component';
import {LibraryComponent} from '../../components/library/library.component';

@Component({
  selector: 'app-main-page',
  imports: [
    NavbarComponent,
    LibraryComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
