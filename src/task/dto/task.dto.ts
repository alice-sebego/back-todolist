import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  isDone?: boolean;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  userId?: string;
}
