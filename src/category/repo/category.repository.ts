import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Category } from "../../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  private getBaseQuery(): SelectQueryBuilder<Category> {
    return this.repository
      .createQueryBuilder("category")
      .orderBy("category.name", "ASC");
  }

  async findAll(page: number, pageSize: number): Promise<[Category[], number]> {
    return this.getBaseQuery()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
  }
}
