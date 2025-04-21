import { Component } from '@angular/core';
import {Music} from '../../models/music';
import {PlayerService} from '../../services/player.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-music-player',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent {
  isPlaying = false;
  currentTime = 0;
  currentTrack: Music | null = null;
  repeatMode: 'none' | 'all' | 'one' = 'none';
  shuffleMode = false;
  seekValue = 0;

  get duration(): number {
    return this.currentTrack?.duration || 0;
  }

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
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

  onSeekChange(event: any): void {
    const newTime = parseFloat(event.target.value);
    this.playerService.seekTo(newTime);
  }

  toggleRepeat(): void {
    this.playerService.toggleRepeatMode();
    this.repeatMode = this.playerService.currentRepeatMode as 'none' | 'all' | 'one';
  }

  toggleShuffle(): void {
    this.playerService.toggleShuffleMode();
    this.shuffleMode = this.playerService.currentShuffleMode;
  }

  formatTime(seconds: number): string {
    if(isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
