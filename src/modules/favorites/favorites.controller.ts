import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { FavoritesService } from './favorites.service';
import { Favorites } from './interfaces/favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorites> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Track id is invalid (not uuid)');
    }

    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Track id is invalid (not uuid)');
    }

    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is invalid (not uuid)');
    }

    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Album id is invalid (not uuid)');
    }

    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Artist id is invalid (not uuid)');
    }

    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Artist id is invalid (not uuid)');
    }

    return this.favoritesService.removeArtist(id);
  }
}
