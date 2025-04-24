import { Component } from '@angular/core';
import {Music} from '../../models/music';
import {PlayerService} from '../../services/player.service';
import {NgForOf, NgIf} from '@angular/common';
import {MusicService} from '../../services/music.service';
import {ArtistService} from '../../services/artist.service';

@Component({
  selector: 'app-music-player',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './music-player.component.html',
  standalone: true,
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent {
  isPlaying = false;
  currentTime = 0;
  currentTrack: Music | null = null;
  repeatMode: 'none' | 'all' | 'one' = 'none';
  shuffleMode = false;
  duration = 0;
  isSeeking = false;





  constructor(private playerService: PlayerService, private musicService: MusicService, private artistService: ArtistService) {}

  ngOnInit() {
    this.musicService.getTracks().subscribe(tracks => {
      if (tracks.length > 0) {
        this.playerService.loadTrack(tracks[0].id);
      }
    });

    if (typeof this.currentTrack?.artist === 'number') {
      const artistId = this.currentTrack.artist;
      this.artistService.getArtistById(artistId).subscribe(artist => {
        this.currentTrack!.artist = artist;
      });
    }

    this.playerService.isPlaying$.subscribe(playing => {
      this.isPlaying = playing;
    });

    this.playerService.currentTime$.subscribe(time => {
      this.currentTime = time;
    });

    this.playerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
    });

    this.repeatMode = this.playerService.currentRepeatMode as 'none' | 'all' | 'one';
    this.shuffleMode = this.playerService.currentShuffleMode;

    this.playerService.duration$.subscribe(duration => {
      this.duration = duration || 0.1;
    });
  }


  getProgressPercent(): string {
    const percent = (this.currentTime / this.duration) * 100;
    return `${percent}%`;
  }

  togglePlay(): void {
    this.playerService.togglePlay();
  }

  nextTrack(): void {
    this.playerService.nextTrack();
  }

  prevTrack(): void {
    this.playerService.prevTrack();
  }

  onSeekChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = (event.target as HTMLInputElement).value;
    const newTime = parseFloat(input.value);
    const percent = (parseFloat(input.value) / parseFloat(input.max)) * 100;
    this.currentTime = newTime;
    console.log(this.currentTime)
    this.playerService.seekTo(newTime);
    input.style.setProperty('--progress', `${percent}%`);
  }
  onSeekStart() {
    this.isSeeking = true;
    console.log(this.currentTime, this.duration);
    console.log('this is current time:', this.currentTime, 'this is duration:', this.duration);
  }

  onSeekEnd() {
    this.isSeeking = false;
    console.log('this is current time:', this.currentTime, 'this is duration:', this.duration);
  }


  toggleRepeat(): void {
    this.playerService.toggleRepeatMode();
    this.repeatMode = this.playerService.currentRepeatMode as 'none' | 'all' | 'one';
    console.log(this.repeatMode);
  }

  toggleShuffle(): void {
    this.playerService.toggleShuffleMode();
    this.shuffleMode = this.playerService.currentShuffleMode;
    console.log('shuffle is:', this.shuffleMode);
  }

  formatTime(seconds: number): string {
    if(isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
