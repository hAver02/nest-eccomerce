import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    let { userId, totalAmount } = createBudgetDto;
    if(!totalAmount) totalAmount = 0;
    if(!userId) throw new BadRequestException('Missing userId');
    const data = await this.budgetsService.create({userId, totalAmount})

    if(!data) throw new InternalServerErrorException();
    return { ok : true, budget : data}
    
  }

  @Get()
  async findAll() {
    const budgets = await this.budgetsService.findAll();
    if(!Array.isArray(budgets)) throw new BadRequestException();
    return { ok : true, budgets}
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const budget = await this.budgetsService.findOne(id);
    if(budget == null) throw new  NotFoundException();
    return { ok : true, budget};
    
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetDto: UpdateBudgetDto) {
    if(updateBudgetDto.userId) delete updateBudgetDto.userId;
    if(updateBudgetDto.totalAmount < 0) throw new BadRequestException('Total amoun cannot be less than zero')

    const updatedBudget = await this.budgetsService.update(id, updateBudgetDto);
    if(updatedBudget) return { ok : true, updatedBudget}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(+id);
  }
}
