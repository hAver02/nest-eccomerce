import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService :PrismaService){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return this.prismaService.category.create({data : createCategoryDto});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.prismaService.category.findMany({include : {subcategories : true}});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.category.delete({where : {id}})
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async createBase () {
    try {
      const data = [ {name : 'materiales'}, {name : 'sanitarios'}, {name : 'ferreteria'}]
      const newCategories = await this.prismaService.category.createMany({data})
      console.log(newCategories);
      return newCategories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
