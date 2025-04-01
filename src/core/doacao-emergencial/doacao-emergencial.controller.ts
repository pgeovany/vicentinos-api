import { Controller } from '@nestjs/common';
import { DoacaoEmergencialService } from './doacao-emergencial.service';

@Controller('doacao-emergencial')
export class DoacaoEmergencialController {
  constructor(private readonly doacaoEmergencialService: DoacaoEmergencialService) {}
}
