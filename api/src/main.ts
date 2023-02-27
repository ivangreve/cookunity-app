import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CookUnity')
    .setDescription('This is a api definition for a full-stack challenge')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .setVersion('1.0')
    .addTag('Api Definition')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
