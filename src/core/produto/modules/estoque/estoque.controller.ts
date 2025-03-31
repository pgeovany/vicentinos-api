import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ListarMovimentacoesEstoqueDto } from './dto/listar-movimentacoes-estoque.dto';
import {
  ListarMovimentacaoTotaisResponseDto,
  ListarMovimentacoesEstoqueResponseDto,
} from './doc/estoque.response.dto';
import { ListarEntradasESaidas } from './dto/listar-quantidade-movimentacoes.dto';

@ApiTags('Produto/Estoque')
@UseGuards(JwtAuthGuard)
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Doc({
    nome: 'Listar movimentações estoque',
    resposta: ListarMovimentacoesEstoqueResponseDto,
  })
  @Get('/movimentacoes')
  async listarMovimentacoes(@Query() filtros: ListarMovimentacoesEstoqueDto) {
    return await this.estoqueService.listarMovimentacoes(filtros);
  }

  @Doc({
    nome: 'Listar total entradas e saídas',
    descricao: 'Lista a quantidade total de entradas e saídas dos produtos, com filtros',
    resposta: ListarMovimentacaoTotaisResponseDto,
  })
  @Get('/entradas-saidas')
  async listarEntradasESaidas(@Query() filtros: ListarEntradasESaidas) {
    return await this.estoqueService.listarEntradasESaidas(filtros);
  }
}
