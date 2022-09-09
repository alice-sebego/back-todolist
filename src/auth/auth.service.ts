import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // Save the user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          email: dto.email,
          hash,
          userName: dto.userName,
        },
      });

      return this.signToken(user.id, user.email, user.userName);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email, user.userName);
  }

  async signToken(
    id: string,
    email: string,
    userName: string,
  ): Promise<{
    access_token: string;
    id;
    email;
    userName;
  }> {
    const payload = {
      sub: id,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '180d',
      secret: secret,
    });

    return {
      access_token: token,
      id: id,
      email: email,
      userName: userName,
    };
  }
}
