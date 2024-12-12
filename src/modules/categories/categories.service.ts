import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }


  create(createCategoryDto: CreateCategoryDto) {
    const newCategorie = this.prisma.categorie.create({
      data: createCategoryDto
    })
    return newCategorie;
  }

  findAll() {
    const allCateogries = this.prisma.categorie.findMany()
    return allCateogries;
  }

  findOne(id: string) {
    const categorieFounded = this.prisma.categorie.findUnique({
      where: { id },
      include: {
        products: true
      }
    })
    return categorieFounded;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
