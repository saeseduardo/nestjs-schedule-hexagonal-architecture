import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/ports/user.repository';
import { User } from '../../../domain/user';
import { TypeOrmUserMapper } from './typeorm-user.mapper';
import { UserEntity } from './user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = TypeOrmUserMapper.toEntity(user);
    const savedEntity = await this.repository.save(entity);
    return TypeOrmUserMapper.toDomain(savedEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? TypeOrmUserMapper.toDomain(entity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? TypeOrmUserMapper.toDomain(entity) : null;
  }
}
