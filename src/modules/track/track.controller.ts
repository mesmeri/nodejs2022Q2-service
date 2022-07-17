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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Track id is invalid (not uuid)');
    }

    return this.trackService.findOne(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id') @Body() id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Track id is invalid (not uuid)');
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new BadRequestException('Track id is invalid (not uuid)');
    }

    return this.trackService.delete(id);
  }
}
