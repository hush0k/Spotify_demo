import {Artist} from './artist';
import {Album} from './album';

export interface Music {
  id: number;
  title: string;
  image: string;
  duration: number;
  audio: string;
  artist: Artist;
  albums: Album[];
}
