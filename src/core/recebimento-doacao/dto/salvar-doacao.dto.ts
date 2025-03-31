import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  Min,
  IsInt,
} from 'class-validator';
import { ENUM_RECEBIMENTO_DOACAO_ORIGEM } from 'src/utils/enum/recebimento-doacao.enum';

export class ItemDoacaoDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  @IsString()
  @IsNotEmpty()
  produtoId: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  quantidade: number;
}

export class SalvarDoacaoDto {
  @ApiProperty({
    enum: ENUM_RECEBIMENTO_DOACAO_ORIGEM,
    example: ENUM_RECEBIMENTO_DOACAO_ORIGEM.MISSA_DOMINGO,
  })
  @IsEnum(ENUM_RECEBIMENTO_DOACAO_ORIGEM)
  @IsNotEmpty()
  origem: ENUM_RECEBIMENTO_DOACAO_ORIGEM;

  @ApiProperty({ type: [ItemDoacaoDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemDoacaoDto)
  @ArrayNotEmpty()
  itens: ItemDoacaoDto[];
}
