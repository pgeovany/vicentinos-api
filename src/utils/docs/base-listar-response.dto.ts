import { ApiProperty } from '@nestjs/swagger';

export class BaseListarResponseDto {
  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 15 })
  total: number;

  @ApiProperty({ example: 2 })
  totalPaginas: number;
}
