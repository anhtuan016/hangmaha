import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository {
  async findAll(page: number, limit: number) {
    return [];
  }
}
