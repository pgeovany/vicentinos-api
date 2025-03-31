import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Payload } from './entities/payload.entity';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { v7 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly TEMPO_EXPIRACAO_TOKEN_ACCESS = '30d';

  private async validarEGerarToken(
    usuario: Usuario,
    senhaParaValidacao: string,
  ): Promise<string | null> {
    const { senha } = usuario;

    const senhaValida = await bcrypt.compare(senhaParaValidacao, senha);

    if (!senhaValida) {
      return null;
    }

    const payload: Payload = {
      sub: usuario.id,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: this.TEMPO_EXPIRACAO_TOKEN_ACCESS,
      secret: process.env.JWT_SECRET,
    });

    return token;
  }

  private async processarSessaoAcesso(req: Request, res: Response) {
    const nomeCookie = '_sessao_acesso';
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const cookieAcesso = req.cookies[nomeCookie];
    const ip = req.ip ?? '';
    let sessaoAcessoId = '';

    if (!cookieAcesso) {
      sessaoAcessoId = uuid();
      res.cookie(nomeCookie, sessaoAcessoId, { httpOnly: true, expires });
    }
    if (cookieAcesso) {
      sessaoAcessoId = cookieAcesso;
    }

    const tentativasMaximas = parseInt(process.env.TENTATIVAS_LOGIN_MAXIMAS ?? '5');
    const minutosPrazo = 1000 * 60 * parseInt(process.env.MINUTOS_PRAZO_TENTATIVAS ?? '5');
    const intervaloControle = new Date(Date.now() - minutosPrazo);

    const tentativasRealizadas = await this.prismaService.controleTentativaAcesso.findMany({
      where: {
        OR: [{ sessao: sessaoAcessoId }, { ip }],
        criadoEm: {
          gte: intervaloControle,
          lte: new Date(),
        },
      },
      orderBy: {
        criadoEm: 'asc',
      },
    });

    if (tentativasRealizadas.length === 0 || tentativasRealizadas.length < tentativasMaximas) {
      return [sessaoAcessoId, ip];
    }

    const prazoPelaMaisAntiga = tentativasRealizadas[0].criadoEm.getTime() + minutosPrazo;
    const tempoRestante = Math.ceil((prazoPelaMaisAntiga - Date.now()) / 1000 / 60);
    console.error(
      `\n\x1b[35m[AUTH]\x1b[m ${new Date().toLocaleString()} \x1b[31mTentativa de acesso bloqueadas para:\x1b[m \nIP: \x1b[33m${ip}\x1b[m | Sessão: \x1b[33m${sessaoAcessoId}\x1b[m`,
    );
    res.status(429).json({
      message: `Muitas tentativas de acesso. Tente novamente em ${tempoRestante} minutos`,
      statusCode: 429,
    });
    res.end();
    return null;
  }

  private async salvarTentativaAcesso(sessao: string, ip: string, email: string) {
    console.error(
      `\n\x1b[35m[AUTH]\x1b[m ${new Date().toLocaleString()} \x1b[31mTentativa de acesso inválida:\x1b[m \nIP: \x1b[33m${ip}\x1b[m | Sessão: \x1b[33m${sessao}\x1b[m | E-mail: \x1b[33m${email}\x1b[m`,
    );
    await this.prismaService.controleTentativaAcesso.create({
      data: {
        sessao,
        ip,
        email,
      },
    });
  }

  // metodo utilizado pela strategy jwt, inclui os dados do usuario no contexto da requisição
  async validarAuth(payload: Payload) {
    const { sub } = payload;
    const idUsuario = sub;

    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        id: idUsuario,
        status: 'ATIVO',
      },
    });

    if (!usuario) {
      return null;
    }

    return {
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil,
    };
  }

  async login(signAuthDto: LoginDto, req: Request, res: Response) {
    const { email, senha } = signAuthDto;

    const processamento = await this.processarSessaoAcesso(req, res);

    if (processamento === null) {
      return;
    }

    const [sessao, ip] = processamento;

    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        email,
        status: 'ATIVO',
      },
    });

    const credencialInvalida = async () => {
      await this.salvarTentativaAcesso(sessao, ip, email);
      res
        .status(401)
        .json({
          message: 'Credenciais inválidas',
          statusCode: 401,
        })
        .end();
    };

    if (!usuario) {
      return credencialInvalida();
    }

    const token = await this.validarEGerarToken(usuario, senha);

    if (!token) {
      return credencialInvalida();
    }

    const retorno = {
      message: 'Operação realizada com sucesso.',
      statusCode: 200,
      data: {
        token,
        perfil: usuario.perfil,
        nome: usuario.nome ?? null,
        id: usuario.id,
      },
    };
    res.status(200).json(retorno).end();
  }
}
