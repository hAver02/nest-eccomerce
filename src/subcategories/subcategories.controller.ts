import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Post('baseSubCategories')
  async createSubCate() {
    const newSubCategories = await this.subcategoriesService.createSubCate();
    console.log(newSubCategories);
    return { ok : true, message : 'Sub categories created sucesfully!'};
    
  }


  @Get()
  async findAll() {
    const subCategories = await this.subcategoriesService.findAll();
    return { ok : true, subCategories};
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const subcat = await this.subcategoriesService.findOne(id);
    if(!subcat) return { ok : false, message : 'Not found subcat with this id'};
    return { ok : true, subcat };
    
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.remove(id);
  }
}
