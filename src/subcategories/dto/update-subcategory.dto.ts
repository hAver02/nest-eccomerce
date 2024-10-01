import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoryDto } from './create-subcategory.dto';
import e from 'express';

// export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {
// }
export type UpdateSubcategoryDto = Partial<CreateSubcategoryDto>;