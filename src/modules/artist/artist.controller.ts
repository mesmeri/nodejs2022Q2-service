import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import uuid from 'uuid';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Artist id is invalid (not uuid)');
    }

    return this.artistService.findOne(id);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') @Body() id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Artist id is invalid (not uuid)');
    }

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Artist id is invalid (not uuid)');
    }

    return this.artistService.delete(id);
  }
}
