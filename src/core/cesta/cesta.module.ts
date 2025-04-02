import { Module } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { CestaController } from './cesta.controller';
import { DistribuicaoCestaService } from './distribuicao-cesta.service';
import { ProdutoModule } from '../produto/produto.module';
import { EstoqueModule } from '../produto/modules/estoque/estoque.module';

@Module({
  controllers: [CestaController],
  providers: [ComposicaoCestaService, DistribuicaoCestaService],
  imports: [ProdutoModule, EstoqueModule],
})
export class CestaModule {}
