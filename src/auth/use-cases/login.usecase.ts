import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository, private readonly jwt: JwtService) {}

  async execute(email: string, password: string): Promise<string> {
    // simple linear search (repo may provide findByEmail in real project)
    // reuse existing repo: find all not available, so try by id/email brute-force for demo
    // We'll assume repo has a findById only; in real apps add findByEmail.
    // For demo, try a few known ids (not ideal). Instead, cast repo to any and check findByEmail.
    const anyRepo: any = this.repo as any;
    let user = null;
    if (typeof anyRepo.findByEmail === 'function') {
      user = await anyRepo.findByEmail(email);
    } else if (typeof anyRepo.findAll === 'function') {
      const all = await anyRepo.findAll();
      user = all.find((u: any) => u.email === email) ?? null;
    } else {
      // fallback: try id=email
      user = await this.repo.findById(email);
    }

    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password ?? '');
    if (!ok) throw new Error('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return this.jwt.sign(payload);
  }
}
