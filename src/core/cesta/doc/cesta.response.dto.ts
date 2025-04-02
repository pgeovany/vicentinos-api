import { ApiProperty } from '@nestjs/swagger';

class ItemCestaResponseDto {
  @ApiProperty({ example: 'cm8zbgjap0000gnfh9hmk13gd' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 3 })
  quantidade: number;
}

export class CestaResponseDto {
  @ApiProperty({ example: 'cm8zbgjap0000gnfh9hmk13gd' })
  id: string;

  @ApiProperty({ example: 'G' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({
    example: 'Cesta básica média',
    description: 'Descrição detalhada do tipo de cesta',
  })
  descricao: string;

  @ApiProperty({ example: '2025-04-02T02:37:12.242Z' })
  criadoEm: string;

  @ApiProperty({ example: '2025-04-02T02:37:12.242Z' })
  atualizadoEm: string;

  @ApiProperty({ type: [ItemCestaResponseDto] })
  produtos: ItemCestaResponseDto[];
}
