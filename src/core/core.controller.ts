import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';

@ApiExcludeController()
@ApiTags('Sistema')
@Controller('core/health-check')
export class CoreController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/')
  healthCheck() {
    return;
  }
}
