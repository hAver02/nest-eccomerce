import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prismaSerice : PrismaService){}
  create(createSubcategoryDto: CreateSubcategoryDto) {
    return 'This action adds a new subcategory';
  }
  async createSubCate(){
    const data = [  {name : 'bolsas', categoryId : 1}, {name : 'aridos', categoryId : 1}, {name : 'vigas', categoryId : 1},
      {name : 'hierros', categoryId : 1}, {name : 'ladrillos', categoryId : 1}, {name : 'techo', categoryId : 1},
      {name : 'pegamentos', categoryId : 1}, {name : 'herramientas', categoryId : 3}, {name : 'discos', categoryId : 3},
      {name : 'carretillas', categoryId : 3}, {name : 'tanques', categoryId : 2}, {name : 'termofusion', categoryId : 2},
      {name : 'pvc', categoryId : 2}
    ]
    try {
      const newsSubCategories = await this.prismaSerice.subCategory.createMany({
        data : data
      })
      return newsSubCategories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findAll() {
    try {
      return await this.prismaSerice.subCategory.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return this.prismaSerice.subCategory.findUnique({where : { id }})
    } catch (error) {
      
    }
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const subCat = await this.findOne(id);
      if(!subCat) throw new BadRequestException();
      const subCatUpdated = await this.prismaSerice.subCategory.update({where : {id}, data : updateSubcategoryDto});
      return subCatUpdated;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const subCate = await this.findOne(id);
      if(!subCate) throw new BadRequestException();
      return await this.prismaSerice.subCategory.delete({where : { id }});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
