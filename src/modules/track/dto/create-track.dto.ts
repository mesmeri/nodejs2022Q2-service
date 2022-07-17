import { IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsInt()
  duration: number;
}
