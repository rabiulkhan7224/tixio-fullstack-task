import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



 app.enableCors({
    origin: ['http://localhost:3000', 'https://frontend-production-97bc.up.railway.app'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger / OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('REST API with NestJS + Prisma + PostgreSQL')
    .setVersion('1.0')
    // .addBearerAuth()              
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,          
      // docExpansion: 'none',                
      defaultModelsExpandDepth: -1,        
      tagsSorter: 'alpha',                 
      operationsSorter: 'alpha',           
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`API running on: http://localhost:${port}`);
  console.log(`Swagger UI:   http://localhost:${port}/api`);
}

bootstrap();