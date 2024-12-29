import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import * as bcrypt from 'bcrypt'
import { bcryptCompare, bcryptHash } from '../../utils/bcrypt.utils'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
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
        username: userFounded.name,
        userRole: userFounded.role
      }

      const jwToken = this.jwt.sign(payload, { secret: 'clavesecreta', expiresIn: '1h' })
      return {
        message: 'Logueado con exito maquina del espacio!!',
        jwToken,
        user: userFounded
      }


    } catch (error) {
      throw new Error('Error al inentar procesar los datos')

    }
  }
}
