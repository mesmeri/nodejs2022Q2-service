import { IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1800)
  @Max(2022)
  year: number;

  artistId: string | null;
}