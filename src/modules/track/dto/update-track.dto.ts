import { IsInt, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsInt()
  duration: number;
}
