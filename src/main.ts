import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {  ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./logger/winston-logger";
import { AllExceptionsFilter } from "./logger/error.handling";
async function start() {
  try {
    const PORT = process.env.PORT ?? 3003;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());

    
  
    const config = new DocumentBuilder()
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your Bearer token",
          name: "JWT",
          in: "header",
        },
        "authorization"
      )
      .setTitle("UyFinder example")
      .setDescription("The UyFinder API description")
      .setVersion("1.0")
      .addTag("UyFinder")
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("documentation", app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`Server is runnning at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();