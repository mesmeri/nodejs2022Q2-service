import { TrackService } from './../track/track.service';

import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Favorites } from './interfaces/favorites.interface';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  private favorites: Favorites = {
    artists: new Set(),
    albums: new Set(),
    tracks: new Set(),
  };

  async findAll() {
    const artistsPromises = [...this.favorites.artists].map(async (id) =>
      this.artistService.findOne(id),
    );
    const albumsPromises = [...this.favorites.artists].map(async (id) =>
      this.albumService.findOne(id),
    );
    const tracksPromises = [...this.favorites.artists].map(async (id) =>
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

  async addTrack(id: string) {
    if (this.favorites.tracks.has(id)) {
      throw new BadRequestException(
        `Track with id ${id} already exists in favorites`,
      );
    }

    this.favorites.tracks.add(id);
  }

  async removeTrack(id: string) {
    if (!this.favorites.tracks.has(id)) {
      throw new UnprocessableEntityException(
        `Track with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.tracks.delete(id);
  }

  async addAlbum(id: string) {
    if (this.favorites.albums.has(id)) {
      throw new BadRequestException(
        `Album with id ${id} already exists in favorites`,
      );
    }

    this.favorites.albums.add(id);
  }

  async removeAlbum(id: string) {
    if (!this.favorites.tracks.has(id)) {
      throw new UnprocessableEntityException(
        `Album with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.albums.delete(id);
  }

  async addArtist(id: string) {
    if (this.favorites.artists.has(id)) {
      throw new BadRequestException(
        `Artist with id ${id} already exists in favorites`,
      );
    }

    this.favorites.artists.add(id);
  }

  async removeArtist(id: string) {
    if (!this.favorites.artists.has(id)) {
      throw new UnprocessableEntityException(
        `Artist with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.artists.delete(id);
  }
}
