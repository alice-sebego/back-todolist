import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @ApiProperty()
  isDone?: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId?: string;
}
