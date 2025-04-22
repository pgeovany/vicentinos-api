import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  Min,
  IsInt,
  IsOptional,
} from 'class-validator';

class ItemDoacaoDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  @IsString()
  @IsNotEmpty()
  produtoId: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  quantidade: number;
}

export class SalvarDistribuicaoEmergencialDto {
  @ApiProperty({ example: 'José', required: false })
  @IsOptional()
  @IsString()
  beneficiario?: string;

  @ApiProperty({ example: 'Doação emergencial', required: false })
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiProperty({ type: [ItemDoacaoDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemDoacaoDto)
  @ArrayNotEmpty()
  itens: ItemDoacaoDto[];
}
