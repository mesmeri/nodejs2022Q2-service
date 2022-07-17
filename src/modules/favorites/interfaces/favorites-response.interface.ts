import { Track } from 'src/modules/track/interfaces/track.interface';
import { Album } from 'src/modules/album/interfaces/album.interface';
import { Artist } from 'src/modules/artist/interfaces/artist.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
