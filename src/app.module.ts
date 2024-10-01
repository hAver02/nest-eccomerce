import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { BudgetsModule } from './budgets/budgets.module';
import { BudgetProductModule } from './budget-product/budget-product.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';


@Module({
  imports: [ProductsModule, UsersModule, BudgetsModule, BudgetProductModule, CategoriesModule, SubcategoriesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
