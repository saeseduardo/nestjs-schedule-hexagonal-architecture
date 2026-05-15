import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class RegisterUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(id: string, name: string, email: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User(id, name, email, hashed);
    await this.repo.save(user);
    return user;
  }
}
