import {Music} from './music';

export interface Artist {
  id: number;
  name: string;
  image: string;
  musics: Music[];
}
