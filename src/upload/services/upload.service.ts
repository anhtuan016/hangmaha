import { ConfigService } from "@nestjs/config";
import { getCurrentDateTime } from "@/utils/date-utils";
import { BadRequestException, Injectable } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage, FileFilterCallback, Options } from "multer";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadService {
  private uploadDir: string;
  private finalPath: string;
  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>("UPLOAD_PATH", "UPLOAD_PATH NOT FOUND");
    this.finalPath = join(__dirname, "..", "..", this.uploadDir);
    this.ensureUploadDirExists();
  }
  private ensureUploadDirExists() {
    if (!existsSync(this.finalPath)) {
      mkdirSync(this.finalPath, { recursive: true });
    }
  }
  getMulterOptions(): Options {
    return {
      storage: diskStorage({
        destination: this.finalPath,
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split(".").pop();
          const fileName = `${uuidv4()}-${getCurrentDateTime()}.${fileExtension}}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb: FileFilterCallback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
          cb(new BadRequestException("Only support jpg|jpeg|png|gif|pdf"));
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB file size limit
      },
    };
  }
}