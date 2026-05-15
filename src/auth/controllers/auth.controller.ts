import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RecoverDto } from '../dto/recover.dto';
import { RegisterUseCase } from '../use-cases/register.usecase';
import { LoginUseCase } from '../use-cases/login.usecase';
import { RecoverUseCase } from '../use-cases/recover.usecase';
import { ResetUseCase } from '../use-cases/reset.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly register: RegisterUseCase, private readonly login: LoginUseCase, private readonly recover: RecoverUseCase, private readonly reset: ResetUseCase) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterDto) {
    const user = await this.register.execute(dto.id, dto.name, dto.email, dto.password);
    return { data: user };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.login.execute(dto.email, dto.password);
    return { token };
  }

  @Post('recover')
  async recover(@Body() dto: RecoverDto) {
    await this.recover.execute(dto.email);
    return { ok: true };
  }

  @Post('reset')
  async reset(@Body() body: { email: string; token: string; newPassword: string }) {
    await this.reset.execute(body.email, body.token, body.newPassword);
    return { ok: true };
  }
}
