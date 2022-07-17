import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: new Set(),
    albums: new Set(),
    tracks: new Set(),
  };

  findAll() {
    return this.favorites;
  }

  addTrack(id: string) {
    if (this.favorites.tracks.has(id)) {
      throw new BadRequestException(
        `Track with id ${id} already exists in favorites`,
      );
    }

    this.favorites.tracks.add(id);
  }

  removeTrack(id: string) {
    if (!this.favorites.tracks.has(id)) {
      throw new NotFoundException(
        `Track with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.tracks.delete(id);
  }

  addAlbum(id: string) {
    if (this.favorites.albums.has(id)) {
      throw new BadRequestException(
        `Album with id ${id} already exists in favorites`,
      );
    }

    this.favorites.albums.add(id);
  }

  removeAlbum(id: string) {
    if (!this.favorites.tracks.has(id)) {
      throw new NotFoundException(
        `Album with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.albums.delete(id);
  }

  addArtist(id: string) {
    if (this.favorites.artists.has(id)) {
      throw new BadRequestException(
        `Artist with id ${id} already exists in favorites`,
      );
    }

    this.favorites.artists.add(id);
  }

  removeArtist(id: string) {
    if (!this.favorites.artists.has(id)) {
      throw new NotFoundException(
        `Artist with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.artists.delete(id);
  }
}
