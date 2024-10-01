import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBudgetProductDto } from './dto/create-budget-product.dto';
import { UpdateBudgetProductDto } from './dto/update-budget-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BudgetProductService {
  constructor(private prismaService: PrismaService){}
  async create(createBudgetProductDto: CreateBudgetProductDto) {
    try {
      return this.prismaService.budgetProduct.create({data : createBudgetProductDto})
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    return await this.prismaService.budgetProduct.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.budgetProduct.findUnique({where : { id : id}})
  }

  async update(id: number, updateBudgetProductDto: UpdateBudgetProductDto) {
    try {
      return this.prismaService.budgetProduct.update({where : {id : id}, data : updateBudgetProductDto});  
    } catch (error) {
      throw new InternalServerErrorException();
    }
  } 

  async remove(id: number) {
    try {
      return await this.prismaService.budgetProduct.delete({where : { id : id }});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
