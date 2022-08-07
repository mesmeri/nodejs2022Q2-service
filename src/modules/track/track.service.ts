import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException(`The track with id ${id} is not found`);
    }

    return track;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const artistId = createTrackDto.artistId || null;
    const albumId = createTrackDto.albumId || null;

    const track = await this.prisma.track.create({
      data: {
        id,
        artistId,
        albumId,
        name: createTrackDto.name,
        duration: createTrackDto.duration,
      },
    });

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException(`The track with id ${id} is not found`);
    }

    const artistId = updateTrackDto.artistId || null;
    const albumId = updateTrackDto.albumId || null;

    const updatedTrack = await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        id,
        artistId,
        albumId,
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
      },
    });

    return updatedTrack;
  }

  async delete(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException(`The track with id ${id} doesn't exist`);
    }

    await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }
}
