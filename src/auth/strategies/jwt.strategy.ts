import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from '../entities/payload.entity';
import { AppErrorInternal } from 'src/utils/errors/app-errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    if (!process.env.JWT_SECRET) {
      throw new AppErrorInternal('JWT_SECRET não definido');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload) {
    const user = await this.authService.validarAuth(payload);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }
    return user;
  }
}
