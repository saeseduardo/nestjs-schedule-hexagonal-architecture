import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private items = new Map<string, User>();
  private recovery = new Map<string, string>();

  async save(user: User): Promise<void> {
    this.items.set(user.id, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const u of this.items.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.items.values());
  }

  async saveRecoveryToken(email: string, token: string): Promise<void> {
    this.recovery.set(email, token);
  }

  async verifyRecoveryToken(email: string, token: string): Promise<boolean> {
    return this.recovery.get(email) === token;
  }

  async findById(id: string): Promise<User | null> {
    return this.items.get(id) ?? null;
  }
}

