import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';


export type UpdateProductDto = Partial<CreateProductDto>


