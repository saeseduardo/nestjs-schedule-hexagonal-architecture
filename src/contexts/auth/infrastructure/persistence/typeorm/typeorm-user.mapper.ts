import { User } from '../../../domain/user';
import { UserEntity } from './user.entity';

export class TypeOrmUserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(entity.id, entity.email, entity.passwordHash, entity.createdAt, entity.updatedAt);
  }

  static toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}
