import { Repository, SelectQueryBuilder } from "typeorm";
import { Tag } from "@/entities/tag.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTagDto } from "@/tag/dtos/tag.dto";

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<Tag> {
    return this.repository.createQueryBuilder("t").orderBy("t.name", "ASC");
  }
  async findAll(page: number = 1, pageSize: number = 10): Promise<[Tag[], number]> {
    return this.getBaseQuery()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();
  }

  async getById(id: number): Promise<Tag> {
    const category = await this.getBaseQuery().where("t.id = :id", { id }).getOne();
    if (!category) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return category;
  }
  async getByIds(ids: number[]): Promise<Tag[]> {
    const rs = await this.getBaseQuery().where("t.id IN (:...ids)", { ids }).getMany();
    return rs;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async create(dto: CreateTagDto): Promise<Tag> {
    const tag = this.repository.create({
      ...dto,
    });
    return this.repository.save(tag);
  }
}
