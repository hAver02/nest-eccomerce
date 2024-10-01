import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, BadRequestException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { BudgetProductService } from './budget-product.service';
import { CreateBudgetProductDto } from './dto/create-budget-product.dto';
import { UpdateBudgetProductDto } from './dto/update-budget-product.dto';

@Controller('budget-product')
export class BudgetProductController {
  constructor(private readonly budgetProductService: BudgetProductService) {}

  @Post()
  async create(@Body() createBudgetProductDto: CreateBudgetProductDto) {
    const { budgetId, productId, quantity, price } = createBudgetProductDto;
    if(!budgetId ||  !productId || !quantity || !price) throw new BadRequestException('Not data sent');
    //consultar primero para ver si existe product id y budget id
    const newBudgetProduct = await this.budgetProductService.create(createBudgetProductDto)
    return { ok : true, budgetProduct : newBudgetProduct }
  }

  @Get()
  async findAll() {
    const data = await this.budgetProductService.findAll();
    if(!Array.isArray(data)) throw new InternalServerErrorException();
    return {ok : true, budgetProduct : data}

  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const budgetProduct = await this.budgetProductService.findOne(id);
    if(!budgetProduct) throw new NotFoundException();
    return { ok : true, budgetProduct}
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetProductDto: UpdateBudgetProductDto) {
    if(updateBudgetProductDto.budgetId) delete updateBudgetProductDto.budgetId;
    if(updateBudgetProductDto.productId) delete updateBudgetProductDto.productId;
    const budgetProduct = await this.budgetProductService.findOne(id)
    if(!budgetProduct) throw new NotFoundException();
    const updatedBudgetProduct = await this.budgetProductService.update(id, updateBudgetProductDto)
    return {ok : true, updatedBudgetProduct }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const budgetProduct = await this.budgetProductService.findOne(id)
    if(!budgetProduct) throw new NotFoundException();
    const deletedProduct = await this.budgetProductService.remove(id)
    return { ok : true, message : 'BudgetProduct deleted sucesfully!'}
  }
}
