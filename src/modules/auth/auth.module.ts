import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import JwtModuleConfig from 'src/common/jwt/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [JwtModuleConfig(), MessagingModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
