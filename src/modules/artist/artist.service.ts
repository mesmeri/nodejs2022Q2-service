import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

const db = [];

@Injectable()
export class ArtistService {
  private artists: Artist[] = db;

  async findOne(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`The artist with id ${id} is not found`);
    }

    return artist;
  }

  async findAll() {
    return this.artists;
  }

  async create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();

    this.artists.push({ id, ...createArtistDto });

    return this.findOne(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException(`The artist with id ${id} is not found`);
    }

    const updatedArtist = {
      id,
      ...updateArtistDto,
    };

    this.artists.splice(index, 1, updatedArtist);

    return this.findOne(id);
  }

  async delete(id: string) {
    const index = this.artists.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundException(`The artist with id ${id} doesn't exist`);
    }

    this.artists.splice(index, 1);
  }
}
