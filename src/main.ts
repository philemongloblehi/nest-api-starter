import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {LoggerService} from './helpers/utils/logger/logger.service';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useLogger(app.get(LoggerService));
  app.enableCors();
  app.use(compression());
  const options = new DocumentBuilder()
      .setTitle('my-api')
      .setDescription('My-Api')
      .setVersion('1.0')
      .setBasePath('api')
      .addTag('My-Api')
      .addBearerAuth('Authorization', 'header')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(process.env.PORT);
}
bootstrap().then((connection) => {
}).catch(error => { });
