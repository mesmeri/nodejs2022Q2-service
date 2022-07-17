import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`The album with id ${id} is not found`);
    }

    return album;
  }

  findAll() {
    return this.albums;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const artistId = createAlbumDto.artistId || null;

    this.albums.push({ id, ...createAlbumDto, artistId });

    return this.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
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

  delete(id: string) {
    this.albums = this.albums.filter((album) => album.id === id);
  }
}
