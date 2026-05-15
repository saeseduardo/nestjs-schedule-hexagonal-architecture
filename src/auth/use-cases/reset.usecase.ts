import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class ResetUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(email: string, token: string, newPassword: string): Promise<void> {
    const anyRepo: any = this.repo as any;
    if (typeof anyRepo.verifyRecoveryToken === 'function') {
      const ok = await anyRepo.verifyRecoveryToken(email, token);
      if (!ok) throw new Error('Invalid token');
    }
    // find user
    let user = null;
    if (typeof anyRepo.findByEmail === 'function') {
      user = await anyRepo.findByEmail(email);
    } else if (typeof anyRepo.findAll === 'function') {
      const all = await anyRepo.findAll();
      user = all.find((u: any) => u.email === email) ?? null;
    }
    if (!user) throw new Error('User not found');
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await anyRepo.save(user);
  }
}
