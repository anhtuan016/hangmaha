import { UploadInterceptor } from "@/upload/interceptors/upload.interceptor";
import { UploadService } from "@/upload/services/upload.service";
import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(UploadInterceptor)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File is not uploaded");
    }
    return {
      message: "File uploaded successfully",
      filename: file.filename,
    };
  }
}
