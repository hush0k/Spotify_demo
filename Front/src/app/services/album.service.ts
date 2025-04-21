import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Album} from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  // GET-query (get albums)
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}albums/`);
  }

  //POST-query (post albums)
  createAlbum(album: Album): Observable<Album> {
    return this.http.post<any>(this.apiUrl, album);
  }

  //PUT-query (update albums)
  updateAlubm(id:number, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}albums/${id}/`, album);
  }

  //DELETE-query (delete album)
  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}albums/${id}`);
  }


}
