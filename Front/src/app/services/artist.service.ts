import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/artists/${id}`);
  }
}
