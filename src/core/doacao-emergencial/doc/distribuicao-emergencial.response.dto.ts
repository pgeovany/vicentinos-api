import { ApiProperty } from '@nestjs/swagger';

class ItemDoacaoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 8 })
  quantidade: number;
}

export class DistribuicaoEmergencialResponseDto {
  @ApiProperty({ example: 'cm8xa42540000gn04gsk3vjqu' })
  id: string;

  @ApiProperty({ example: 'José' })
  beneficiario: string;

  @ApiProperty({ example: 'Complemento' })
  motivo: string;

  @ApiProperty({ example: '2025-03-31T16:23:58.169Z' })
  criadoEm: Date;

  @ApiProperty({ type: [ItemDoacaoResponseDto] })
  itens: ItemDoacaoResponseDto[];
}
