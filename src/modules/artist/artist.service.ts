import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`The artist with id ${id} is not found`);
    }

    return artist;
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();

    const artist = await this.prisma.artist.create({
      data: {
        id,
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`The artist with id ${id} is not found`);
    }

    const updatedArtist = await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        id,
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
    });

    return updatedArtist;
  }

  async delete(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`The artist with id ${id} doesn't exist`);
    }

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}
