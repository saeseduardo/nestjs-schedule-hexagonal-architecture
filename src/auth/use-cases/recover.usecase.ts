import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

// For demo purposes we'll store tokens in-memory via repo if it supports it, else no-op
@Injectable()
export class RecoverUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(email: string): Promise<void> {
    const anyRepo: any = this.repo as any;
    // create a simple token
    const token = Math.random().toString(36).slice(2);
    if (typeof anyRepo.saveRecoveryToken === 'function') {
      await anyRepo.saveRecoveryToken(email, token);
    }
    // In real app: send email with token
    console.log('Recovery token for', email, token);
  }
}
