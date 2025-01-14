import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';



@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService,
  ) { }

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
      },
      include: {
        profile: true
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


  async updateUser(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File,) {
    console.log('updateUserDto', updateUserDto);
    console.log('id', id);
    const url = await this.awsService.uploadFile(file, id);
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...updateUserDto, address: url },
    });
    console.log('url', url);
    
    return {
      user,
      url
    };
  }


}
