import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasks() {
    return this.prisma.task.findMany();
  }

  getTaskById(id_task: string) {
    return this.prisma.task.findFirst({
      where: {
        id: id_task,
      },
    });
  }

  async addTask(dto: TaskDto) {
    const task = await this.prisma.task.create({
      data: {
        ...dto,
      },
    });

    return task;
  }

  async editTask(id_task: string, dto: TaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: id_task,
      },
    });

    if (!task) throw new ForbiddenException('Task not found');

    return this.prisma.task.update({
      where: {
        id: id_task,
      },
      data: {
        ...dto,
      },
    });
  }
}
