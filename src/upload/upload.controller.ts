import { UploadInterceptor, UploadMultipleInterceptor } from "@/upload/interceptors/upload.interceptor";
import { UploadService } from "@/upload/services/upload.service";
import { BadRequestException, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post("single")
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

  @Post("multiple")
  @UseInterceptors(UploadMultipleInterceptor)
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException("Files are not uploaded");
    }
    const fileNames = files.map((file) => file.filename);
    return {
      message: "Files uploaded successfully",
      filenames: fileNames,
    };
  }
}
