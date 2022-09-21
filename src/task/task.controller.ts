import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { TaskDto } from './dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(
    @Param('id')
    taskId: string,
  ) {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  addTask(
    @Body()
    dto: TaskDto,
  ) {
    return this.taskService.addTask(dto);
  }

  @Patch(':id')
  editTask(@Param('id') TaskId: string, @Body() dto: TaskDto) {
    return this.taskService.editTask(TaskId, dto);
  }
}
