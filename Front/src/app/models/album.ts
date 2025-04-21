import {Artist} from './artist';
import {Music} from './music';

export interface Album {
  id: number;
  name: string;
  image: string;
  artists: Artist[];
  musics: Music[];
}
