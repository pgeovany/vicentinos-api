import { Controller } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}
}
