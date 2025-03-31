import { Controller, Get } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { ListarProdutosMaisNecessitadosResponseDto } from './doc/estoque.response.dto';

@ApiTags('[PÚBLICO] - Produto/Estoque')
@Controller('public/estoque')
export class EstoquePublicController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Doc({
    nome: 'Listar produtos mais necessitados',
    descricao:
      'Retorna a lista dos produtos mais necessitados, de acordo com o peso relativo de cada produto',
    resposta: ListarProdutosMaisNecessitadosResponseDto,
  })
  @Get('/')
  async listarProdutosMaisNecessitados() {
    return await this.estoqueService.listarProdutosMaisNecessitados();
  }
}
