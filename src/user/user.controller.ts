import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(
    @Param('id')
    userId: string,
  ) {
    return this.userService.getUserById(userId);
  }

  @Post()
  addUser(
    @Body()
    dto: UserDto,
  ) {
    return this.userService.addUser(dto);
  }
}
