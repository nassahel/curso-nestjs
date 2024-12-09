import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    const user = this.prisma.user.create({
      data: createUserDto
    });
    return user;
  }

  findAll() {
    const users = this.prisma.user.findMany({
      where: {
        isDeleted: false
      }
    })
    return users;
  }

  findOne(id: string) {
    const userFounded = this.prisma.user.findUnique({
      where: {
        id
      }
    })
    return userFounded;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
    return updatedUser;
  }

  remove(id: string) {
    const softDeletedUser = this.prisma.user.update({
      where: { id },
      data: { isDeleted: true }
    })
    return softDeletedUser;
  }
}
