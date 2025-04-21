import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Album} from '../../models/album';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {
  @Input() album!: Album;

  constructor(private http: HttpClient) { }

  hovering = false;

  openAlbum(){}

  playAlbum($event: MouseEvent){}

}
