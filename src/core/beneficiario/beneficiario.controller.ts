import { Controller } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Beneficiario')
@Controller('beneficiario')
export class BeneficiarioController {
  constructor(private readonly beneficiarioService: BeneficiarioService) {}
}
