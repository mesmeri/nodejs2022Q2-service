import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';
import { JwtGuard } from '../auth/guard/jwt-guard';

@UseGuards(JwtGuard)
@Controller('favs')
@ApiTags('Favorites')
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
    const albumsPromises = [...favorites.albums].map(async (id) => {
      const foundAlbum = await this.albumService.findOne(id);

      return foundAlbum;
    });
    const tracksPromises = [...favorites.tracks].map(async (id) =>
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
    try {
      await this.trackService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `The track with id ${id} doesn't exist`,
        );
      }
    }

    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      await this.albumService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `The album with id ${id} doesn't exist`,
        );
      }
    }

    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      await this.artistService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `The artist with id ${id} doesn't exist`,
        );
      }
    }

    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
