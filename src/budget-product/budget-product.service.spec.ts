import { Test, TestingModule } from '@nestjs/testing';
import { BudgetProductService } from './budget-product.service';

describe('BudgetProductService', () => {
  let service: BudgetProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetProductService],
    }).compile();

    service = module.get<BudgetProductService>(BudgetProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
