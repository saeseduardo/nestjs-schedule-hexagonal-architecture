import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../domain/ports/token.service';
import { User } from '../../domain/user';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }
}
