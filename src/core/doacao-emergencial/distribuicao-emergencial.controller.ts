import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DistribuicaoEmergencialService } from './distribuicao-emergencial.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SalvarDistribuicaoEmergencialDto } from './dto/salvar-distribuicao-emergencial.dto';
import { Doc } from 'src/utils/docs/doc';
import { DistribuicaoEmergencialResponseDto } from './doc/distribuicao-emergencial.response.dto';

@ApiTags('Distribuição emergencial')
@UseGuards(JwtAuthGuard)
@Controller('distribuicao-emergencial')
export class DistribuicaoEmergencialController {
  constructor(private readonly distribuicaoEmergencialService: DistribuicaoEmergencialService) {}

  @Doc({
    nome: 'Salvar distribuição emergencial',
    descricao: 'Salva uma nova distribuição emergencial doada',
    resposta: DistribuicaoEmergencialResponseDto,
  })
  @Post('/')
  async salvar(@Body() params: SalvarDistribuicaoEmergencialDto) {
    return await this.distribuicaoEmergencialService.salvar(params);
  }
}
