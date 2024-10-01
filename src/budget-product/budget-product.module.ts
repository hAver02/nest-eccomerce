import { Module } from '@nestjs/common';
import { BudgetProductService } from './budget-product.service';
import { BudgetProductController } from './budget-product.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BudgetProductController],
  providers: [BudgetProductService, PrismaService],
})
export class BudgetProductModule {}
