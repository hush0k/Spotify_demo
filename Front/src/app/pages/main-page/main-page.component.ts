import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navigation/navbar.component';
import {LibraryComponent} from '../../components/library/library.component';
import {MainComponent} from '../../components/main/main.component';
import {PreviewComponent} from '../../components/preview/preview.component';
import {LoginComponent} from '../../components/login/login.component';

@Component({
  selector: 'app-main-page',
  imports: [
    NavbarComponent,
    LibraryComponent,
    MainComponent,
    PreviewComponent,
    LoginComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
