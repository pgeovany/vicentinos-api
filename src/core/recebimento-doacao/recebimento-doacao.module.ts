import { Module } from '@nestjs/common';
import { RecebimentoDoacaoService } from './recebimento-doacao.service';
import { RecebimentoDoacaoController } from './recebimento-doacao.controller';
import { EstoqueModule } from '../produto/modules/estoque/estoque.module';
import { ProdutoModule } from '../produto/produto.module';

@Module({
  controllers: [RecebimentoDoacaoController],
  providers: [RecebimentoDoacaoService],
  imports: [ProdutoModule, EstoqueModule],
})
export class RecebimentoDoacaoModule {}
