import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { TypeormUserEntity } from './infrastructure/adapters/persistence/typeorm-user.entity';
import { TypeormUserRepository } from './infrastructure/adapters/persistence/typeorm-user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [TypeormUserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TypeormUserEntity]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: TypeormUserRepository,
    },
  ],
})
export class AppModule {}
