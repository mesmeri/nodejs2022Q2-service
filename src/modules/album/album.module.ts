import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FavoritesService, TrackService],
})
export class AlbumModule {}
