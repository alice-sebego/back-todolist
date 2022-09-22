import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async editUser(id_user: string, dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id_user,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    return this.prisma.user.update({
      where: {
        id: id_user,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteUser(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id_user,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    return await this.prisma.user.delete({
      where: {
        id: id_user,
      },
    });
  }
}
