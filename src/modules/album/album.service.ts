import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new NotFoundException(`The album with id ${id} is not found`);
    }

    return album;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();
    const artistId = createAlbumDto.artistId || null;

    const album = await this.prisma.album.create({
      data: {
        id,
        artistId,
        name: createAlbumDto.name,
        year: createAlbumDto.year,
      },
    });

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    console.log({ album });

    if (!album) {
      throw new NotFoundException(`The album with id ${id} is not found`);
    }

    const artistId = updateAlbumDto.artistId || null;

    const updatedAlbum = await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        id,
        artistId,
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
      },
    });

    return updatedAlbum;
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new NotFoundException(`The user with id ${id} doesn't exist`);
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }

  async checkArtistRefsAndDelete(id: string) {
    // TODO: change implementation using prisma
    // this.albums.forEach((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });
  }
}
