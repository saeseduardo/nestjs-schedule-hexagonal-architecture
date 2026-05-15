import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUseCase } from './use-cases/register.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RecoverUseCase } from './use-cases/recover.usecase';
import { ResetUseCase } from './use-cases/reset.usecase';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'devSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUseCase, LoginUseCase, RecoverUseCase, ResetUseCase],
})
export class AuthModule {}
