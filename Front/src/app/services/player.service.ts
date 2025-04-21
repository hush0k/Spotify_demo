import { Injectable } from '@angular/core';
import { Music} from '../models/music';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = new Audio();
  private currentTrackIndex = 0;
  private playlist: Music[] = [];
  private currentTrackSubject = new BehaviorSubject<Music | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private shuffleMode = false;
  private repeatMode: 'none' | 'all' | 'one' = 'none';

  constructor() {
    this.setupAudioListeners();
  }

  private setupAudioListeners() {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    });

    this.audio.addEventListener('ended', () => {
      this.handleTrackEnd();
    });
  }

  //Load Playlist
  loadPlaylist(playlist: Music[], startIdex: number = 0) {
    this.playlist = playlist;
    this.currentTrackIndex = startIdex;
    this.playTrack(this.currentTrackIndex);
  }

  //Play track by ID
  playTrack(index: number) {
    if (index < 0 || index >= this.playlist.length) return;

    this.currentTrackIndex = index;
    const track = this.playlist[index];
    this.audio.src = track.audio;
    this.audio.load();
    this.audio.play();
    this.currentTrackSubject.next(track);
    this.isPlayingSubject.next(true);
  }

  //Pause/Play
  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.isPlayingSubject.next(true);
    } else {
      this.audio.pause();
      this.isPlayingSubject.next(false);
    }
  }

  //Previous track
  prevTrack() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
    } else {
      if (this.shuffleMode) {
        this.playRandomTrack();
      } else {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length
        this.playTrack(prevIndex);
      }
    }
  }

  //Next Track
  nextTrack() {
    if (this.shuffleMode) {
      this.playRandomTrack();
    } else {
      const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      this.playTrack(nextIndex);
    }
  }

  //Play Random Track
  private playRandomTrack() {
    if (this.playlist.length === 0) return;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.playlist.length);
    } while (randomIndex === this.currentTrackIndex && this.playlist.length > 1);
    this.playTrack(randomIndex);
  }

  //If track is END depend on Shuffle Mode
  private handleTrackEnd() {
    switch (this.repeatMode) {
      case 'one':
        this.audio.currentTime = 0;
        this.audio.play();
        break;
      case 'all':
        this.nextTrack();
        break;
      case 'none':
      default:
        if (this.currentTrackIndex < this.playlist.length - 1) {
          this.nextTrack();
        } else {
          this.isPlayingSubject.next(false);
        }
        break;
    }
  }

  //Setting of time playing
  seekTo(time: number) {
    this.audio.currentTime = time;
  }

  //Repeat MODE
  toggleRepeatMode(){
    const modes: ('none'|'all'|'one')[] = ['one', 'none', "all"];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
  }

  //Shuffle MODE
  toggleShuffleMode(){
    this.shuffleMode = !this.shuffleMode;
  }

  //Getters and Setters

  get isPlaying$(): Observable<boolean> {
    return this.isPlayingSubject.asObservable();
  }
  get currentTime$(): Observable<number> {
    return this.currentTimeSubject.asObservable();
  }
  get currentDuration(): number {
    return this.currentTrackSubject.value?.duration || 0;
  }
  get currentTrack$(): Observable<Music | null> {
    return this.currentTrackSubject.asObservable();
  }
  get currentRepeatMode(): string {
    return this.repeatMode;
  }
  get currentShuffleMode(): boolean {
    return this.shuffleMode;
  }


}
