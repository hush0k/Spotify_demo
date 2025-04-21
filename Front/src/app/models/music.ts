import {Artist} from './artist';
import {Album} from './album';

export interface Music {
  id: number;
  name: string;
  image: string;
  duration: number;
  audio: string;
  artists: Artist[];
  albums: Album[];
}
