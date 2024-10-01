
import { CreateBudgetDto } from './create-budget.dto';

// export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {}
export type UpdateBudgetDto = Partial<CreateBudgetDto>