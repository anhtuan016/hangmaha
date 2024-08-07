import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {
  async findAll(page = 1, limit = 10) {
    throw new Error(`findAll Not yet implemented: ${page} ${limit}`);
  }
}
