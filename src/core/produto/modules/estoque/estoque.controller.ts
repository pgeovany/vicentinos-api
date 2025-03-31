import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ListarMovimentacoesEstoqueDto } from './dto/listar-movimentacoes-estoque.dto';
import { ListarMovimentacoesEstoqueResponseDto } from './doc/estoque.response.dto';

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
}
