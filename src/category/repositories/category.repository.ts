import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Category } from "@/entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<Category> {
    return this.repository.createQueryBuilder("t").orderBy("t.name", "ASC");
  }

  async getById(id: number): Promise<Category> {
    const category = await this.getBaseQuery().where("t.id = :id", { id }).getOne();
    if (!category) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return category;
  }

  async getByIds(ids: number[]): Promise<Category[]> {
    return this.getBaseQuery().where("t.id IN (...ids)", { ids }).getMany();
  }

  async findAll(page: number, pageSize: number): Promise<[Category[], number]> {
    return this.getBaseQuery()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.repository.create(dto);
  }

  async update(dto: UpdateCategoryDto, id: number): Promise<Category> {
    const updatedResult = await this.repository.update(id, dto);
    if (updatedResult.affected === 0) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return this.getById(dto.id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
