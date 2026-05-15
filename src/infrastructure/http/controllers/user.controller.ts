import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../../../shared/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase, @Inject('UserRepository') private readonly repo: any) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto.id, dto.name, dto.email);
    return { data: user };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const user = await this.repo.findById(id);
    if (!user) return { data: null };
    return { data: user };
  }
}
