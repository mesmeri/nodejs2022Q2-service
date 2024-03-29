import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

const db = [];
@Injectable()
export class AlbumService {
  private albums: Album[] = db;

  async findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`The album with id ${id} is not found`);
    }

    return album;
  }

  async findAll() {
    return this.albums;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const artistId = createAlbumDto.artistId || null;

    this.albums.push({ id, ...createAlbumDto, artistId });

    return this.findOne(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException(`The album with id ${id} is not found`);
    }

    const artistId = updateAlbumDto.artistId || null;

    const updatedAlbum = {
      id,
      ...updateAlbumDto,
      artistId,
    };

    this.albums.splice(index, 1, updatedAlbum);

    return this.findOne(id);
  }

  async delete(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`The user with id ${id} doesn't exist`);
    }

    this.albums.splice(index, 1);
  }

  async checkArtistRefsAndDelete(id: string) {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
