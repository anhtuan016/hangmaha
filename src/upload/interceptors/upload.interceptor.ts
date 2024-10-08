import { UploadService } from "@/upload/services/upload.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Observable } from "rxjs";

@Injectable()
export class UploadInterceptor implements NestInterceptor {
  constructor(private readonly uploadService: UploadService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const multerOptions = this.uploadService.getMulterOptions();
    const uploadInterceptor = new (FileInterceptor("file", multerOptions))();
    return uploadInterceptor.intercept(context, next);
  }
}

@Injectable()
export class UploadMultipleInterceptor implements NestInterceptor {
  constructor(private readonly uploadService: UploadService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const multerOptions = this.uploadService.getMulterOptions();
    const uploadInterceptor = new (FilesInterceptor("files", 20, multerOptions))();
    return uploadInterceptor.intercept(context, next);
  }
}
