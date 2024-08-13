import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { Product } from "@/entities/product.entity";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<Product> {
    return this.repository.createQueryBuilder("t").orderBy("t.name", "ASC");
  }

  async getById(id: number): Promise<Product> {
    const category = await this.getBaseQuery().where("t.id = :id", { id }).getOne();
    if (!category) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return category;
  }
  async getByIds(ids: number[]): Promise<Product[]> {
    const rs = await this.getBaseQuery().where("t.id IN (:...ids)", { ids }).getMany();
    return rs;
  }

  async findAllWithCategory(page: number, pageSize: number): Promise<[Product[], number]> {
    return this.getBaseQuery()
      .leftJoinAndSelect("t.categories", "category")
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
  }
  async findAll(page: number, pageSize: number): Promise<[Product[], number]> {
    return this.getBaseQuery()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.repository.create(dto);
  }

  async update(dto: UpdateProductDto, id: number): Promise<Product> {
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
