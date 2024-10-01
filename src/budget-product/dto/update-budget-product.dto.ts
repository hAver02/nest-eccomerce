import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetProductDto } from './create-budget-product.dto';

// export class UpdateBudgetProductDto extends PartialType(CreateBudgetProductDto) {}
export type UpdateBudgetProductDto = Partial<CreateBudgetProductDto>;
