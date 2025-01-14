import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import * as bcrypt from 'bcrypt'
import { bcryptCompare, bcryptHash } from '../../utils/bcrypt.utils'
import { JwtService } from '@nestjs/jwt';
import { MessagingService } from '../messaging/messaging.service';
import { messagingConfig } from 'src/common/constants';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { EmailUser } from './dto/recovery-email.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly messagingService: MessagingService,
    private readonly configService: ConfigService,
  ) { }

  async register(regUser: CreateUserDto) {

    try {
      const findUser = await this.prisma.user.findUnique({
        where: { email: regUser.email }
      })

      if (findUser) {
        return 'Usuario ya registrado'
      }

      await this.prisma.user.create({
        // data: { ...regUser, password: await bcrypt.hash(regUser.password, 10) }
        data: { ...regUser, password: await bcryptHash(regUser.password) }
      })

      await this.messagingService.sendRegisterUserEmail({
        from: this.configService.get<string>('EMAIL_SENDER'),   //ESTO ES LO AGREGADO
        // from: messagingConfig.emailSender,
        to: regUser.email,
        name: regUser.name
      })

      return 'Usuario registrado con exito!';

    } catch (error) {
      console.log(error);
    }
  }


  async login(credentials: CreateAuthDto) {
    try {
      const { email, password } = credentials;
      const userFounded = await this.prisma.user.findUnique({
        where: { email: email }
      })

      if (!userFounded) {
        return 'No se encontro al usuario'
      }

      const passwordOk = await bcryptCompare(password, userFounded.password)

      if (!passwordOk) {
        return 'Datos inicorrectos wachín!'
      }

      const payload = {
        userName: userFounded.name,
        userRole: userFounded.role,
        userId: userFounded.id
      }

      const jwToken = this.jwt.sign(payload, { secret: 'clavesecreta', expiresIn: '1h' })
      return {
        message: 'Logueado con exito !!',
        jwToken,
        user: userFounded
      }
    } catch (error) {
      throw new Error('Error al inentar procesar los datos')
    }
  }

  async recoveryPassword(emailUser: EmailUser) {
    const { email } = emailUser;
    const userRecoverFound = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!userRecoverFound) {
      return { message: 'No se encontro el email' }
    }

    const secretKey = this.configService.get<string>('JWT_SECRET_KEY')
    const payload = { email }
    const token = this.jwt.sign(payload, { secret: secretKey, expiresIn: '30m' })
    const recoverUrl = this.configService.get<string>('BACKOFFICE_RESET_PASSWORD_URL')

    await this.messagingService.recoverEmail({
      from: this.configService.get<string>('EMAIL_SENDER'),
      to: email,
      body: `
      <a href='${recoverUrl + token}' >${recoverUrl + token}</a>
      `       
    })
    return {
      message: 'Email de recuperacion enviado',
      email
    }
  }
}
