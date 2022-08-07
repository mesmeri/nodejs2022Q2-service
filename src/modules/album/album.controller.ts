import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './../favorites/favorites.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '@prisma/client';
import { TrackService } from '../track/track.service';
import { JwtGuard } from '../auth/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.favoritesService.checkIfPresentAndDelete(id, 'albums');
    this.trackService.checkAlbumRefsAndDelete(id);

    return this.albumService.delete(id);
  }
}
