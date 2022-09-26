import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
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

  @Patch(':id')
  editUser(@Param('id') UserId: string, @Body() dto: UserDto) {
    return this.userService.editUser(UserId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id') UserId: string) {
    return this.userService.deleteUser(UserId);
  }
}
