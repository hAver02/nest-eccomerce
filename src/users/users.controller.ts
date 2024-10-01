import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
      const { email, last_name, first_name, password } = createUserDto;
      if(!email || !last_name || !first_name || !password ) throw new BadRequestException('Invalid data sent');
      if(createUserDto.role == Role.ADMIN) throw new BadRequestException("Yo are not be ADMIN")

      const data = await this.usersService.create(createUserDto);
      if(!data) throw new BadRequestException('Error creating user!');
      return {ok : true, message: 'User created succesfully!'}


  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if(Array.isArray(users)) return { ok : true, users}
    throw new NotFoundException('User not found');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
      const data = await this.usersService.findOne(id);
      if(!data) throw new NotFoundException('User not found');
      return {ok : true, user : data};
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {

    if(updateUserDto.email) delete updateUserDto.email;
    if(updateUserDto.role == Role.ADMIN) throw new BadRequestException("Yo are not be ADMIN")
    
    const data = await  this.usersService.update(id, updateUserDto);
    return { ok : true, message : 'user updated sucesfully!'};
    
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await  this.usersService.remove(id);
    return { ok : true, message: "User deleted sucesfully!"}
  }
}
