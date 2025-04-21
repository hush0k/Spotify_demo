  import { Component } from '@angular/core';
  import {Album} from '../../models/album';
  import {AlbumService} from '../../services/album.service';
  import {AlbumComponent} from '../album/album.component';
  import {NgForOf} from '@angular/common';
  import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-main',
    imports: [AlbumComponent, NgForOf],
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
  })
  export class MainComponent {
    albums: Album[] = [];

    constructor(private albumService: AlbumService, private http: HttpClient) {}

    ngOnInit() {
      this.loadAlbums();
    }

    loadAlbums() {
      this.albumService.getAlbums().subscribe({
        next: (albums) => this.albums = albums,
        error: (error) => console.log('Error loading albums.', error)
      });
    }

  }
