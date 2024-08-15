import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImageModule } from './product-image/product-image.module';

@Module({
  imports: [
    DatabaseModule,
    // ProductModule,
    CategoryModule,
    TagModule,
    ProductImagesModule,
    ProductImageModule,
  ],
})
export class AppModule {}
