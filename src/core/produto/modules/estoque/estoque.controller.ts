import { Controller, Get } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { ListarProdutosMaisNecessitadosResponseDto } from './doc/estoque.response.dto';

@ApiTags('Produto/Estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Doc({
    nome: '[PÚBLICO] Listar produtos mais necessitados',
    descricao:
      'Retorna a lista dos produtos mais necessitados, de acordo com o peso relativo de cada produto',
    resposta: ListarProdutosMaisNecessitadosResponseDto,
  })
  @Get('/')
  async listarProdutosMaisNecessitados() {
    return await this.estoqueService.listarProdutosMaisNecessitados();
  }
}
