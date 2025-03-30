import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppErrorFilter } from './utils/errors/errors.filter';
import { ResponseInterceptor } from './utils/response.interceptor';
import { customCss } from './utils/cssDocs';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME ?? 'API')
    .setDescription(process.env.APP_DESCRIPTION ?? 'Documentação da API')
    .setVersion(process.env.APP_VERSION ?? '0.0')
    .addBearerAuth()
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
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, api-key',
    credentials: true,
  });

  const porta = process.env.PORT ?? 3003;
  await app.listen(porta);
  console.log(`Aplicação executando na porta ${porta}`);
}
void bootstrap();
