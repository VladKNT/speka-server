import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

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

  await app.listen(process.env.PORT);
}

bootstrap();
