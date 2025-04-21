import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Album} from '../../models/album';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {
  @Input() album!: Album;
  hovering = false;
  openAlbum(){}
  playAlbum($event: MouseEvent){
    $event.stopPropagation();
  }

}
