import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { TaskDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
