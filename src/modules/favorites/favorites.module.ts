import { Module } from '@nestjs/common';

import { TrackService } from './../track/track.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistService, AlbumService, TrackService],
})
export class FavoritesModule {}
