import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private prismaService : PrismaService){}
  async create(createBudgetDto: CreateBudgetDto) {
    return this.prismaService.budget.create({data : createBudgetDto});
  }

  async findAll() {
    return this.prismaService.budget.findMany()
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.budget.findUnique({where : { id : id}});
      return data
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
      const budget = await this.findOne(id);
      if(!budget) throw new NotFoundException();
      const data = await this.prismaService.budget.update({where : { id : id}, data : updateBudgetDto});
      return data

  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
