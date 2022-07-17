import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findOne(id: string) {
    const track = this.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`The track with id ${id} is not found`);
    }

    return track;
  }

  findAll() {
    return this.tracks;
  }

  create(createTrackDto: CreateTrackDto) {
    const id = uuidv4();
    const artistId = createTrackDto.artistId || null;
    const albumId = createTrackDto.albumId || null;

    this.tracks.push({ id, ...createTrackDto, artistId, albumId });

    return this.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
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

  delete(id: string) {
    this.tracks = this.tracks.filter((track) => track.id === id);
  }
}