import { Controller } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Produto/Estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}
}
