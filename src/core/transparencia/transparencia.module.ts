import { Module } from '@nestjs/common';
import { TransparenciaService } from './transparencia.service';
import { TransparenciaController } from './transparencia.controller';
import { EstoqueModule } from '../produto/modules/estoque/estoque.module';

@Module({
  controllers: [TransparenciaController],
  providers: [TransparenciaService],
  imports: [EstoqueModule],
})
export class TransparenciaModule {}
