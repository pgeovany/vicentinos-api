import { ApiProperty } from '@nestjs/swagger';

export class ListarProdutosMaisNecessitadosResponseDto {
  @ApiProperty({ type: [String], example: ['ARROZ'] })
  produtos: string[];
}
