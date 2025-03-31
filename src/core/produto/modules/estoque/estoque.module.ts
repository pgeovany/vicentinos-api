import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { ProdutoModule } from '../../produto.module';
import { EstoqueCronService } from './estoque-cron.service';
import { EstoquePublicController } from './estoque.public.controller';

@Module({
  controllers: [EstoqueController, EstoquePublicController],
  providers: [EstoqueService, EstoqueCronService],
  imports: [ProdutoModule],
  exports: [EstoqueService],
})
export class EstoqueModule {}
