import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  hash?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;
}
