import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }


  create(createProductDto: CreateProductDto) {
    const newProduct = this.prisma.product.create({
      data: createProductDto
    })
    return newProduct;
  }

  findAll() {
    const products = this.prisma.product.findMany({
      where: { isActive: true }
    })
    return products;
  }

  findOne(id: string) {
    const foundProduct = this.prisma.product.findUnique({
      where: { id }
    })
    return foundProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = this.prisma.product.update({
      where: { id },
      data: updateProductDto
    })
    return updateProductDto;
  }

  remove(id: string) {
    const softDisabledProduct = this.prisma.product.update({
      where: { id },
      data: { isActive: false }
    })
    return softDisabledProduct;
  }
}
