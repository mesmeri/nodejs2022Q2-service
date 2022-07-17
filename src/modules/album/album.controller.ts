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
import { validate as uuidValidate } from 'uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is invalid (not uuid)');
    }

    return this.albumService.findOne(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is invalid (not uuid)');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is invalid (not uuid)');
    }

    return this.albumService.delete(id);
  }
}
