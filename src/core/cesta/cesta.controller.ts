import { Controller } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { DistribuicaoCestaService } from './distribuicao-cesta.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cesta')
@Controller('cesta')
export class CestaController {
  constructor(
    private readonly composicaoCestaService: ComposicaoCestaService,
    private readonly distribuicaoCestaService: DistribuicaoCestaService,
  ) {}
}
