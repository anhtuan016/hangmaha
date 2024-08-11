import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DatabaseModule,
    // ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
