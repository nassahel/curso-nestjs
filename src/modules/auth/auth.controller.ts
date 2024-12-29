import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() regUser: CreateUserDto) {
    return this.authService.register(regUser);
  }

  @Post('login')
  login(@Body() credentials: CreateAuthDto) {
    return this.authService.login(credentials);
  } 
}
