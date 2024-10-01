import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    if(!createCategoryDto.name) throw new BadRequestException();
    const newCategory = await this.categoriesService.create(createCategoryDto);
    return { ok : true, newCategory};
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return { ok : true, categories }
  }

  @Post('baseCategories')
  async createBaseCategories(){
    const newCategories = await this.categoriesService.createBase();
    if(newCategories.count == 0) return { ok : false, messge : 'Can not create categories'};
    return { ok : true, message : 'created sucesfully!'}
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
