import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService){}

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({data : createProductDto});
  }

  async findAll() {
   return await this.prismaService.product.findMany({include : {subcategory : true}});
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({ where : { id : id}})
    if(!product)throw new NotFoundException(`Product with ${id} does not exist`);
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExist = await this.findOne(id);
    const productUpdated = await this.prismaService.product.update({ where : {id}, data : updateProductDto});

    return productUpdated
    
  }

  async remove(id: number) {
    const productDeleted = await this.prismaService.product.delete({ where : { id : id}});
    // console.log(productDeleted);
    if(!productDeleted) throw new NotFoundException(`Product with ${id} does not exist`);
    return { ok : true, message : 'Product deleted sucesfully!'} 
  }
  async createBaseProduct(){
    try {
      const newProducts = [
        {name : 'Cemento LN', description : 'Cemento Loma Negra x50kg', price : 10700, image : 'https://arcencohogar.vtexassets.com/arquivos/ids/336923/1994314-1.jpg?v=638016126170000000', subcategoryId : 1},
        {name : 'Plasticor', description : 'CPlasticor x50kg', price : 8200, image : 'https://arcencohogar.vtexassets.com/arquivos/ids/336923/1994314-1.jpg?v=638016126170000000', subcategoryId : 1},
        {name : 'Arena', description : 'Metro de arena', price : 30000, image : 'https://arcencohogar.vtexassets.com/arquivos/ids/336923/1994314-1.jpg?v=638016126170000000', subcategoryId : 2},
        {name : 'Arena', description : 'Metro de piedra', price : 80000, image : 'https://arcencohogar.vtexassets.com/arquivos/ids/336923/1994314-1.jpg?v=638016126170000000', subcategoryId : 2},
        {name : 'Arena', description : 'Varilla del 6', price : 6200, image : 'https://arcencohogar.vtexassets.com/arquivos/ids/336923/1994314-1.jpg?v=638016126170000000', subcategoryId : 4},
      ]
      const createdProducts = await this.prismaService.product.createMany({ data : newProducts});
    } catch (error) {
      throw new  InternalServerErrorException()
    }
  }
}
