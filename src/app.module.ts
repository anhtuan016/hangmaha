import { Module } from '@nestjs/common';
import { ProductModule } from '@/product/product.module';
import { DatabaseModule } from '@/database/database.module';
import { CategoryModule } from '@/category/category.module';
import { TagModule } from '@/tag/tag.module';
import { ProductImageModule } from '@/product-image/product-image.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    CategoryModule,
    TagModule,
    ProductImageModule,
    UploadModule,
    AuthModule,
  ],
  providers: [],
  controllers: [HealthCheckController],
})
export class AppModule {}
