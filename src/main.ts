import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Настройка глобального пайпа валидации
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // удаляет поля, которых нет в DTO
    forbidNonWhitelisted: true,   // выбрасывает ошибку, если есть лишние поля
    transform: true,              // автоматически преобразует типы
  }));
  await app.listen(3000);
}
bootstrap();
