import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CriarProdutoDto, EditarProdutoDto } from './dto/criar-produto.dto';
import { Doc } from 'src/utils/docs/doc';
import { ProdutoComEstoqueResponseDto } from './doc/produto.response';
import { AlterarStatusProdutoDto } from './dto/alterar-status-produto.dto';

@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Doc({
    nome: 'Criar produto',
    descricao: 'Cria um novo produto com estoque vazio.\n\nOBS: O nome do produto deve ser único.',
    resposta: ProdutoComEstoqueResponseDto,
  })
  @Post('/')
  async criar(@Body() data: CriarProdutoDto) {
    return await this.produtoService.criar(data);
  }

  @Doc({
    nome: 'Editar produto',
    descricao: 'Edita o nome do produto.\n\nOBS: O nome do produto deve ser único.',
    resposta: ProdutoComEstoqueResponseDto,
  })
  @Put('/:produtoId')
  async editar(@Param('produtoId') produtoId: string, @Body() data: EditarProdutoDto) {
    return await this.produtoService.editar({ produtoId, data });
  }

  @Doc({
    nome: 'Alterar status produto',
    resposta: ProdutoComEstoqueResponseDto,
  })
  @Put('/:produtoId/alterar-status')
  async alterarStatus(
    @Param('produtoId') produtoId: string,
    @Body() data: AlterarStatusProdutoDto,
  ) {
    return await this.produtoService.alterarStatus({ produtoId, status: data.status });
  }
}
