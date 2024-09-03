import { IsString, IsOptional, IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateUserProfileDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}

export class UpdateUserProfileDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  updatedAt?: Date;
}
