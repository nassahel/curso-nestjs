import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT');
  const NODE_ENV = configService.get<string>('NODE_ENV');
  
  // const PORT = process.env.PORT || 3000;
  // const NODE_ENV = process.env.NODE_ENV || 'development';
  
  await app.listen(PORT, () => {
    Logger.log(`Application running the port: http://localhost:${PORT}`, NestApplication.name);
    Logger.log(`Current enviroment: ${NODE_ENV}`, NestApplication.name);
  });
}
bootstrap();
