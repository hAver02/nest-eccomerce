import { SubCategory } from "@prisma/client";

// export class CreateSubcategoryDto {}
export type CreateSubcategoryDto = Omit<SubCategory, 'id' | 'category' | 'products'>;