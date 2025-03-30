import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

export function Doc(params: {
  nome: string;
  descricao?: string;
  status?: HttpStatus;
  resposta?: Function;
}) {
  const statusCode = params.status ?? HttpStatus.OK;
  if (!params.resposta) {
    return applyDecorators(
      ApiOperation({
        summary: params.nome,
        description: params.descricao,
      }),
      ApiResponse({
        status: statusCode,
        schema: {
          properties: {
            statusCode: { type: 'number', example: statusCode },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso',
            },
            data: { type: 'any', example: null },
          },
        },
      }),
    );
  }

  return applyDecorators(
    ApiOperation({
      summary: params.nome,
      description: params.descricao,
    }),
    ApiExtraModels(params.resposta),
    ApiResponse({
      status: statusCode,
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: 'number', example: statusCode },
              message: {
                type: 'string',
                example: 'Operação realizada com sucesso',
              },
              data: {
                $ref: getSchemaPath(params.resposta),
              },
            },
          },
        ],
      },
    }),
  );
}
