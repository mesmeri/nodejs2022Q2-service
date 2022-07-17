import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesService.findAll();

    const artistsPromises = [...favorites.artists].map(async (id) =>
      this.artistService.findOne(id),
    );
    const albumsPromises = [...favorites.artists].map(async (id) =>
      this.albumService.findOne(id),
    );
    const tracksPromises = [...favorites.artists].map(async (id) =>
      this.trackService.findOne(id),
    );

    const artists = await Promise.all(artistsPromises);
    const albums = await Promise.all(albumsPromises);
    const tracks = await Promise.all(tracksPromises);

    return {
      artists,
      albums,
      tracks,
    };
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
