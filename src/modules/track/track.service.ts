import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

const db = [];
@Injectable()
export class TrackService {
  private tracks: Track[] = db;

  async findOne(id: string) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`The track with id ${id} is not found`);
    }

    return track;
  }

  async findAll() {
    return this.tracks;
  }

  async create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const artistId = createTrackDto.artistId || null;
    const albumId = createTrackDto.albumId || null;

    this.tracks.push({ id, ...createTrackDto, artistId, albumId });

    return this.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException(`The track with id ${id} is not found`);
    }

    const artistId = updateTrackDto.artistId || null;
    const albumId = updateTrackDto.albumId || null;

    const updatedTrack = {
      id,
      ...updateTrackDto,
      artistId,
      albumId,
    };

    this.tracks.splice(index, 1, updatedTrack);

    return this.findOne(id);
  }

  async delete(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new NotFoundException(`The track with id ${id} doesn't exist`);
    }

    this.tracks.splice(index, 1);
  }

  async checkArtistRefsAndDelete(id: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  async checkAlbumRefsAndDelete(id: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
