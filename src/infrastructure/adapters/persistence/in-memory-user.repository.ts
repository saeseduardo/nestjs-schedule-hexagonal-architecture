import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private items = new Map<string, User>();

  async save(user: User): Promise<void> {
    this.items.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.items.get(id) ?? null;
  }
}
