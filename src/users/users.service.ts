import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({ data : createUserDto});
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({where : {id : id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({where : {id : id}, data : updateUserDto});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
   try {
     return await this.prismaService.user.delete({where : { id : id}})
   } catch (error) {
    
   }
  }
}
