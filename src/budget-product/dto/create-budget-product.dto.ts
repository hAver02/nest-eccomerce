import { BudgetProduct } from "@prisma/client";




export type CreateBudgetProductDto = Omit<BudgetProduct, 'id' | 'budget' | 'product'>