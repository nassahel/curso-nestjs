import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) { }


  create(createProfileDto: CreateProfileDto) {
    const newProfile = this.prisma.profile.create({
      data: createProfileDto
    })
    return newProfile;
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: string) {
    const profileFound = this.prisma.profile.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    }
    )
    return profileFound;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
