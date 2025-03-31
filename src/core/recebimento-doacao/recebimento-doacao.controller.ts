import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecebimentoDoacaoService } from './recebimento-doacao.service';
import { ApiTags } from '@nestjs/swagger';
import { SalvarDoacaoDto } from './dto/salvar-doacao.dto';
import { Doc } from 'src/utils/docs/doc';
import {
  EstatisticasDoacoesResponseDto,
  ListarRecebimentoDoacoesResponseDto,
  RecebimentoDoacaoResponseDto,
} from './doc/recebimento-doacao.response.dto';
import { ListarDoacoesDto } from './dto/listar-doacoes.dto';
import { ObterEstatisticasDoacoesDto } from './dto/obter-estatisticas-doacoes.dto';

@ApiTags('Recebimento Doação')
@Controller('recebimento-doacao')
export class RecebimentoDoacaoController {
  constructor(private readonly recebimentoDoacaoService: RecebimentoDoacaoService) {}

  @Doc({
    nome: 'Salvar doação',
    descricao: 'Salva uma nova doação recebida',
    resposta: RecebimentoDoacaoResponseDto,
  })
  @Post('/')
  async salvar(@Body() params: SalvarDoacaoDto) {
    return await this.recebimentoDoacaoService.salvar(params);
  }

  @Doc({
    nome: 'Listar doações',
    descricao: 'Lista todas as doações recebidas, com filtros',
    resposta: ListarRecebimentoDoacoesResponseDto,
  })
  @Get('/')
  async listar(@Query() params: ListarDoacoesDto) {
    return await this.recebimentoDoacaoService.listar(params);
  }

  @Doc({
    nome: 'Obter estatísticas',
    descricao: 'Retorna estatísticas das doações no período',
    resposta: EstatisticasDoacoesResponseDto,
  })
  @Get('/estatisticas')
  async obterEstatisticas(@Query() params: ObterEstatisticasDoacoesDto) {
    return await this.recebimentoDoacaoService.obterEstatisticas(params);
  }
}
