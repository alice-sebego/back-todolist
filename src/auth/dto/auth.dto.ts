import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username_user: string;

  @IsEmail()
  @IsNotEmpty()
  email_user: string;

  @IsString()
  @IsNotEmpty()
  password_user: string;

  @IsOptional()
  @IsDateString()
  createdAt_user?: Date;

  @IsOptional()
  @IsDateString()
  updateAt_user?: Date;
}
