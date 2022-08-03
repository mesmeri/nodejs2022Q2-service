import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1800)
  @Max(2022)
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
