import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PASSWORD_HASHER, PasswordHasher } from '../../domain/ports/password-hasher';
import { TOKEN_SERVICE, TokenService } from '../../domain/ports/token.service';
import { USER_REPOSITORY, UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/user';
import { AuthResponse } from '../dto/auth.response';
import { RegisterCommand } from '../dto/register.command';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  async execute(command: RegisterCommand): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(command.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const now = new Date();
    const passwordHash = await this.passwordHasher.hash(command.password);
    const user = new User(randomUUID(), command.email, passwordHash, now, now);
    const savedUser = await this.userRepository.save(user);
    const accessToken = await this.tokenService.generate(savedUser);

    return {
      accessToken,
      user: {
        id: savedUser.id,
        email: savedUser.email,
      },
    };
  }
}
