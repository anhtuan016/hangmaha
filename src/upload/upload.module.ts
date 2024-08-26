import { UploadService } from '@/upload/services/upload.service';
import { UploadController } from '@/upload/upload.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
