import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';

@Module({
  controllers: [EstoqueController],
  imports: [ProdutoModule],
  exports: [EstoqueService],
})
export class EstoqueModule {}
