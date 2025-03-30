import { Module } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { BeneficiarioController } from './beneficiario.controller';

@Module({
  controllers: [BeneficiarioController],
  providers: [BeneficiarioService],
})
export class BeneficiarioModule {}
