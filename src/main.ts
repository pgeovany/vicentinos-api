import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppErrorFilter } from './utils/errors/errors.filter';
import { ResponseInterceptor } from './utils/response.interceptor';
import { customCss } from './utils/cssDocs';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Doações - Vincentinos')
    .setDescription('Documentação da API')
    .addBearerAuth()
    .addTag('[PÚBLICO] - Produto/Estoque')
    .addTag('[PÚBLICO] - Transparência')
    .addTag('Autenticação')
    .addTag('Produto')
    .addTag('Produto/Estoque')
    .addTag('Cesta')
    .addTag('Beneficiário')
    .addTag('Recebimento doação')
    .addTag('Distribuição emergencial')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'purple',
      darkMode: false,
      hideModels: true,
      hideDownloadButton: true,
      spec: {
        content: document,
      },
      customCss: customCss,
    }),
  );

  app.use(cookieParser());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 150, // Limit each IP to 100 requests per windowMs
      message: 'Muitas requisições, tente novamente mais tarde.',
    }),
  );

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'exposeAll',
      enableImplicitConversion: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AppErrorFilter());

  app.enableShutdownHooks();

  app.enableCors({
    origin: true, // process.env.FRONTEND_URL,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const porta = process.env.PORT ?? 3003;
  await app.listen(porta);
  console.log(`Aplicação executando na porta ${porta}`);
}
void bootstrap();
