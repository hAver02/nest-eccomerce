import { Budget } from "@prisma/client"

export type CreateBudgetDto = Omit <Budget,'id' | 'user' | 'createdAt' | 'budgetProducts' >
