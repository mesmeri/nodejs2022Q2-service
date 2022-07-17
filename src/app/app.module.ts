import { UserModule } from './../modules/user/user.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from 'src/modules/track/track.module';
import { AlbumModule } from 'src/modules/album/album.module';
import { ArtistModule } from 'src/modules/artist/artist.module';

@Module({
  imports: [UserModule, TrackModule, AlbumModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
