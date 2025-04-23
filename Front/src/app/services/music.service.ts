// services/music.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Music[]> {
    return this.http.get<Music[]>(this.apiUrl);
  }

  getTrack(id: number): Observable<Music> {
    return this.http.get<Music>(`${this.apiUrl}${id}/`);
  }

  getAlbumTrack(albumId: number, musicId: number): Observable<Music> {
    return this.http.get<Music>(`${this.apiUrl}albums/${albumId}/tracks/${musicId}/`);
  }

  getAlbumTracks(albumId: number): Observable<Music[]> {
    return this.http.get<Music[]>(`${this.apiUrl}albums/${albumId}/tracks/`);
  }
}
