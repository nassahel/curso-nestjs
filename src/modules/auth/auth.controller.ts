import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailUser } from './dto/recovery-email.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() regUser: CreateUserDto) {
    return this.authService.register(regUser);
  }

  @Post('login')
  login(@Body() credentials: CreateAuthDto) {
    return this.authService.login(credentials);
  }

  @Post('recoveryPassword')
  recoveryPassword(@Body() emailUser: EmailUser) {
    
    return this.authService.recoveryPassword(emailUser);
  }
}
