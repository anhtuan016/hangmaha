import { ConfigService } from "@nestjs/config";
import { getCurrentDateTime } from "@/utils/date-utils";
import { BadRequestException, Injectable } from "@nestjs/common";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { diskStorage, FileFilterCallback, Options } from "multer";
import { join, isAbsolute } from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadService {
  private uploadDir: string;
  private finalPath: string;
  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>("UPLOAD_PATH", "UPLOAD_PATH NOT FOUND");
    if (isAbsolute(this.uploadDir)) {
      this.finalPath = this.uploadDir;
    } else {
      this.finalPath = join(__dirname, "..", "..", this.uploadDir);
    }
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
          const fileName = `${uuidv4()}-${getCurrentDateTime()}.${fileExtension}`;
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

  async handleFileStream(fileStream: NodeJS.ReadableStream, filename: string, mimeType: string) {
    const filePath = join(this.finalPath, `${getCurrentDateTime()}${filename}`);
    return new Promise( (resolve, reject) => {
      if(!mimeType.match(/\/(jpg|jpeg|png|gif|pdf|csv|xlsx|xls)$/)){
        reject(new BadRequestException('Only support jpg|jpeg|png|gif|pdf|csv|xlsx|xls'));
      }
      const writeStream = createWriteStream(filePath);
      fileStream.pipe(writeStream);

      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', (err) => reject(err));
    })
  }
}
