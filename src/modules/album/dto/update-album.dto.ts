import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1800)
  @Max(2022)
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
