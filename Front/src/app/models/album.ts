import {Artist} from './artist';
import {Music} from './music';

export interface Album {
  id: number;
  title: string;
  image: string;
  artist: Artist;
  musics: Music[];
  isExplicit: boolean;
}
