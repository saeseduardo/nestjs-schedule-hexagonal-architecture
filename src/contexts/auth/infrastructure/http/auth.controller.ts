import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { LoginCommand } from '../../application/dto/login.command';
import { RegisterCommand } from '../../application/dto/register.command';
import { JwtAuthGuard } from '../security/jwt-auth.guard';
import { JwtPayload } from '../security/jwt-payload';
import { AuthResponseDoc } from './dto/auth.response.doc';
import { LoginRequest } from './dto/login.request';
import { RegisterRequest } from './dto/register.request';
import { CurrentUser } from './current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: AuthResponseDoc })
  register(@Body() request: RegisterRequest) {
    return this.registerUserUseCase.execute(new RegisterCommand(request.email, request.password));
  }

  @Post('login')
  @ApiOkResponse({ type: AuthResponseDoc })
  login(@Body() request: LoginRequest) {
    return this.loginUserUseCase.execute(new LoginCommand(request.email, request.password));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@CurrentUser() user: JwtPayload) {
    return this.getCurrentUserUseCase.execute(user.sub);
  }
}
