import { Controller, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ResponseLoginDto } from './dto/response-login.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuario' })
  @ApiResponse({ status: 200, type: ResponseLoginDto })
  @HttpCode(200)
  @Post('login')
  async login(@Body() signAuthDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.login(signAuthDto, req, res);
  }
}
