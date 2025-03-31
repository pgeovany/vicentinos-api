import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ENUM_STATUS_PRODUTO } from 'src/utils/enum/produto.enum';

export class AlterarStatusProdutoDto {
  @ApiProperty({ example: ENUM_STATUS_PRODUTO.ATIVO, enum: ENUM_STATUS_PRODUTO })
  @IsEnum(ENUM_STATUS_PRODUTO)
  @IsNotEmpty()
  status: ENUM_STATUS_PRODUTO;
}
