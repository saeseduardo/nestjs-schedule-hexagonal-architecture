import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { TypeormUserEntity } from './infrastructure/adapters/persistence/typeorm-user.entity';
import { TypeormUserRepository } from './infrastructure/adapters/persistence/typeorm-user.repository';
import { InMemoryUserRepository } from './infrastructure/adapters/persistence/in-memory-user.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [TypeormUserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TypeormUserEntity]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: TypeormUserRepository,
    },
    // keep in-memory available for tests if needed
    {
      provide: 'InMemoryUserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
})
export class AppModule {}
