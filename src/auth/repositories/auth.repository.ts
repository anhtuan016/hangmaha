import { UserProfile } from "@/entities/user-profile.entity";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}
  private getUserBaseQuery(): SelectQueryBuilder<User> {
    return this.userRepository.createQueryBuilder("t").orderBy("t.name", "ASC");
  }
  private getUserProfileBaseQuery(): SelectQueryBuilder<UserProfile> {
    return this.userProfileRepository.createQueryBuilder("t").orderBy("t.name", "ASC");
  }
  async getUserById(id: number): Promise<User> {
    return this.getUserBaseQuery().where("t.id = :id", { id }).getOne();
  }
  async getUserByUsername(username: string): Promise<User> {
    return this.getUserBaseQuery().where("t.username = :username", { username }).getOne();
  }
}
