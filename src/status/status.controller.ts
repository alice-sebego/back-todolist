import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { StatusDto } from './dto';
import { StatusService } from './status.service';

@UseGuards(JwtGuard)
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get('all')
  getStatus() {
    return this.statusService.getStatus();
  }

  @Get(':id')
  getStatusById(
    @Param('id')
    statusId: string,
  ) {
    return this.statusService.getStatusById(statusId);
  }

  @Post()
  addStatus(
    @Body()
    dto: StatusDto,
  ) {
    return this.statusService.addStatus(dto);
  }
}
