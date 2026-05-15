import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PASSWORD_HASHER, PasswordHasher } from '../../domain/ports/password-hasher';
import { TOKEN_SERVICE, TokenService } from '../../domain/ports/token.service';
import { USER_REPOSITORY, UserRepository } from '../../domain/ports/user.repository';
import { AuthResponse } from '../dto/auth.response';
import { LoginCommand } from '../dto/login.command';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginCommand): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await this.passwordHasher.compare(command.password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.tokenService.generate(user);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
