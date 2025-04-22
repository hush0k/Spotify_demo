import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Album} from '../../models/album';
import { HttpClient } from '@angular/common/http';
import {AlbumService} from '../../services/album.service';
import {ArtistService} from '../../services/artist.service';
import {MusicService} from '../../services/music.service';
import {PlayerService} from '../../services/player.service';

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

  constructor(private http: HttpClient, private artistService: ArtistService, private musicService: MusicService, private playerService: PlayerService) { }

  ngOnInit(): void {
    if (typeof this.album.artist === 'number') {
      const artistId = this.album.artist;
      this.artistService.getArtistById(artistId).subscribe(artist => {
        this.album.artist = artist;
      });
    }
    console.log(this.album.artist);
  }

  hovering = false;
  openAlbum(){}

  playAlbum(): void {
    this.musicService.getAlbumTracks(this.album.id).subscribe(tracks => {
      if (tracks.length > 0) {
        this.playerService.loadPlaylist(tracks, 0);
        console.log(tracks);
      }
      else {
        console.log('No tracks found.');
      }
    });
  }

}
