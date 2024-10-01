import { Test, TestingModule } from '@nestjs/testing';
import { BudgetProductController } from './budget-product.controller';
import { BudgetProductService } from './budget-product.service';

describe('BudgetProductController', () => {
  let controller: BudgetProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetProductController],
      providers: [BudgetProductService],
    }).compile();

    controller = module.get<BudgetProductController>(BudgetProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
