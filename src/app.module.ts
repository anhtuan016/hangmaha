import { Module } from '@nestjs/common';
import { ProductModule } from '@/product/product.module';
import { DatabaseModule } from '@/database/database.module';
import { CategoryModule } from '@/category/category.module';
import { TagModule } from '@/tag/tag.module';
import { ProductImageModule } from '@/product-image/product-image.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    CategoryModule,
    TagModule,
    ProductImageModule,
    UploadModule,
  ],
})
export class AppModule {}
