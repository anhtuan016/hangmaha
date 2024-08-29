import { UploadInterceptor, UploadMultipleInterceptor } from "@/upload/interceptors/upload.interceptor";
import { UploadService } from "@/upload/services/upload.service";
import { ResponseFactory } from "@/utils/response-factory";
import { BadRequestException, Controller, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import * as Busboy from "busboy";
import { Request, Response } from "express";

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

  @Post("stream")
  async streamFile(@Req() req: Request, @Res() res: Response) {
    const busboy = Busboy({ headers: req.headers });
    const uploadedFiles = [];

    busboy.on("file", (fieldName, file, { filename, encoding, mimeType }) => {
      this.uploadService
        .handleFileStream(file, filename, mimeType)
        .then((filePath) => {
          uploadedFiles.push({ filename, filePath });
        })
        .catch((err) => {
          file.resume();
          throw new BadRequestException(`File upload failed: ${err.message}`);
        });
    });

    busboy.on("finish", () => {
      console.log(`busboy finished`);
      if (uploadedFiles.length === 0) {
        throw new BadRequestException("No files were uploaded");
      }
      res.json(ResponseFactory.success(uploadedFiles,null, 'Files streamly uploaded'));
    });

    req.pipe(busboy);
  }
}
