import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(id: string, name: string, email: string): Promise<User> {
    const user = new User(id, name, email);
    await this.repo.save(user);
    return user;
  }
}
