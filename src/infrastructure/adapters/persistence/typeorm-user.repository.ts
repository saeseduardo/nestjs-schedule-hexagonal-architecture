import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormUserEntity } from './typeorm-user.entity';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(@InjectRepository(TypeormUserEntity) private repo: Repository<TypeormUserEntity>) {}

  async save(user: User): Promise<void> {
    const e = this.repo.create({ id: user.id, name: user.name, email: user.email });
    await this.repo.save(e);
  }

  async findById(id: string): Promise<User | null> {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) return null;
    return new User(e.id, e.name, e.email);
  }
}
