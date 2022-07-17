import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, FavoritesService, AlbumService, TrackService],
})
export class ArtistModule {}
