import { Module, Provider } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { EMAIL_PROVIDER } from './messaging.types';
import { MailjetService } from './mailjet/mailjet.service';
import { JwtService } from '@nestjs/jwt';

const mailServicePrivider: Provider = {
  provide: EMAIL_PROVIDER,
  useClass: MailjetService,
};
@Module({
  providers: [MessagingService, mailServicePrivider, JwtService],
  exports: [MessagingService],
})
export class MessagingModule {}


