import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;
}
