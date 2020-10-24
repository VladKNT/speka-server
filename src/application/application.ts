import { NestFactory, Reflector } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

import { ApplicationModule } from "./application.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle("Speka API")
    .setDescription("The Speka API documentation")
    .setVersion("1.0.0")
    .addTag("Speka")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "Bearer" }, "Access token")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT);
}

bootstrap();
