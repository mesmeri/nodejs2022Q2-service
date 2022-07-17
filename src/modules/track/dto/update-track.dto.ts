import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsInt()
  duration: number;
}
