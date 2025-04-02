import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DistribuicaoEmergencialService } from './distribuicao-emergencial.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SalvarDistribuicaoEmergencialDto } from './dto/salvar-distribuicao-emergencial.dto';
import { Doc } from 'src/utils/docs/doc';
import {
  DistribuicaoEmergencialResponseDto,
  EstatisticasDistribuicoesEmergenciaisResponseDto,
  ListarDistribuicoesEmergenciaisResponseDto,
} from './doc/distribuicao-emergencial.response.dto';
import { ListarDistribuicoesEmergenciaisDto } from './dto/listar-distribuicao-emergencial.dto';
import { ObterEstatisticasDistribuicaoEmergencialDto } from './dto/obter-estatisticas-distribuicao-emergencial.dto';

@ApiTags('Distribuição emergencial')
@UseGuards(JwtAuthGuard)
@Controller('distribuicao-emergencial')
export class DistribuicaoEmergencialController {
  constructor(private readonly distribuicaoEmergencialService: DistribuicaoEmergencialService) {}

  @Doc({
    nome: 'Salvar distribuição emergencial',
    descricao: 'Salva uma nova distribuição emergencial doada',
    resposta: DistribuicaoEmergencialResponseDto,
  })
  @Post('/')
  async salvar(@Body() params: SalvarDistribuicaoEmergencialDto) {
    return await this.distribuicaoEmergencialService.salvar(params);
  }

  @Doc({
    nome: 'Listar distribuições emergenciais',
    descricao: 'Lista todas as distribuições emergenciais, com filtros',
    resposta: ListarDistribuicoesEmergenciaisResponseDto,
  })
  @Get('/')
  async listar(@Query() params: ListarDistribuicoesEmergenciaisDto) {
    return await this.distribuicaoEmergencialService.listar(params);
  }

  @Doc({
    nome: 'Obter estatísticas',
    descricao: 'Retorna estatísticas das distribuições emergenciais feitas no período',
    resposta: EstatisticasDistribuicoesEmergenciaisResponseDto,
  })
  @Get('/estatisticas')
  async obterEstatisticas(@Query() params: ObterEstatisticasDistribuicaoEmergencialDto) {
    return await this.distribuicaoEmergencialService.obterEstatisticas(params);
  }
}
