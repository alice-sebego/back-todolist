import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusDto } from './dto';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  getStatus() {
    return this.prisma.status.findMany();
  }

  getStatusById(id_status: string) {
    return this.prisma.status.findFirst({
      where: {
        id_status: id_status,
      },
    });
  }

  async addStatus(dto: StatusDto) {
    const status = await this.prisma.status.create({
      data: {
        ...dto,
      },
    });
    return status;
  }
}
