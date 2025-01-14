import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_PROVIDER, EmailService } from './messaging.types';
import { generate } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MessagingService {
    constructor(@Inject(EMAIL_PROVIDER) private emailService: EmailService,
        private readonly jwt: JwtService) { }

    async sendRegisterUserEmail(input: { from: string; to: string, name: string }) {
        const { from, to, name } = input;
        const subject = `Bienvenido ${name} a la plataforma`;
        const body = `Gracias por registrarte en nuestra plataforma.`;

        await this.emailService.send({
            from,
            to,
            subject,
            body,
        });
    }



    async recoverEmail(input: { from: string; to: string, body: string }) {
        const { from, to, body } = input;
        const subject = `Aqui tienes un link para recuperar la contraseña!`;
          

            await this.emailService.send({
                from,
                to,
                subject,
                body,
            });
    }


}
