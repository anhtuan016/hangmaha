import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove any properties that do not have any validation decorators
      // This helps prevent unwanted properties from being passed
      whitelist: true,
      // Automatically transform payloads to be objects typed according to their DTO classes
      // This ensures that the properties in your controllers are of the correct type
      transform: true,
      // Throw an error if any properties that are not in the whitelist are present
      // This is stricter than just removing them, useful for catching client-side errors
      forbidNonWhitelisted: true,
      transformOptions: {
        // Enable implicit type conversion for primitive types
        // e.g., "5" (string) to 5 (number) if the DTO expects a number
        enableImplicitConversion: true,
      },
    })
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
