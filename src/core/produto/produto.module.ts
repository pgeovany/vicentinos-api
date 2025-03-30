import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { EstoqueModule } from './modules/estoque/estoque.module';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  imports: [EstoqueModule],
})
export class ProdutoModule {}
