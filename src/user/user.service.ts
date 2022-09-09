import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id_user) {
    return this.prisma.user.findFirst({
      where: {
        id: id_user,
      },
    });
  }

  async addUser(dto: UserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });

    return user;
  }
}
