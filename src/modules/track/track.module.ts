import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './track.service';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavoritesService],
})
export class TrackModule {}
