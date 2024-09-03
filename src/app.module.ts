import { Module } from '@nestjs/common';
import { ProductModule } from '@/product/product.module';
import { DatabaseModule } from '@/database/database.module';
import { CategoryModule } from '@/category/category.module';
import { TagModule } from '@/tag/tag.module';
import { ProductImageModule } from '@/product-image/product-image.module';
import { UploadModule } from './upload/upload.module';
import { AuthService } from './auth/services/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
  providers: [AuthService],
  controllers: [AuthController],
})
export class AppModule {}
