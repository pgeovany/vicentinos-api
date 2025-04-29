import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function Doc(params: {
  nome: string;
  descricao?: string;
  status?: HttpStatus;
  resposta?: Function; // eslint-disable-line @typescript-eslint/ban-types
  array?: boolean;
  auth?: boolean;
}) {
  const statusCode = params.status ?? HttpStatus.OK;
  const requiresAuth = params.auth ?? true;

  const decorators = [
    ApiOperation({
      summary: params.nome,
      description: params.descricao,
    }),
  ];

  if (requiresAuth) {
    decorators.push(ApiBearerAuth());
  }

  if (!params.resposta) {
    decorators.push(
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
    return applyDecorators(...decorators);
  }

  decorators.push(
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
              data: params.array
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(params.resposta) },
                  }
                : {
                    $ref: getSchemaPath(params.resposta),
                  },
            },
          },
        ],
      },
    }),
  );

  return applyDecorators(...decorators);
}
