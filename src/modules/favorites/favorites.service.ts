import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './interfaces/favorites.interface';

const db: Favorites = {
  artists: new Set(),
  albums: new Set(),
  tracks: new Set(),
};

@Injectable()
export class FavoritesService {
  private favorites: Favorites = db;

  async findAll() {
    return {
      artists: [...this.favorites.artists],
      albums: [...this.favorites.albums],
      tracks: [...this.favorites.tracks],
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
      throw new NotFoundException(
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
    if (!this.favorites.albums.has(id)) {
      throw new NotFoundException(
        `Album with id ${id} doesn't exist in favorites`,
      );
    }

    return this.favorites.albums.delete(id);
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
      throw new NotFoundException(
        `Artist with id ${id} doesn't exist in favorites`,
      );
    }

    this.favorites.artists.delete(id);
  }

  async checkIfPresentAndDelete(id: string, key: keyof Favorites) {
    if (this.favorites[key].has(id)) {
      this.favorites[key].delete(id);
    }
  }
}
