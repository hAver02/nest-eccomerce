import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")

  app.enableCors(); // permite cualquier dominio del front!
  await app.listen(4000);
}
bootstrap();
