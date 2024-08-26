import { HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiResponseWithPaging } from "../types/api-response";
import { ClassConstructor, plainToInstance } from "class-transformer";

export type PagingOptions = {
  page?: number,
  pageSize?: number,
  totalItems?: number,
  totalPages?: number
}

export class ResponseFactory {
  static success<T>(data: T = null, dto: ClassConstructor<T> = null, message: string = "Ok"): ApiResponse<T> {
    return {
      status: HttpStatus.OK,
      message,
      data: !dto ? plainToInstance(dto, data, { excludeExtraneousValues: false }) : data,
    };
  }

  static error(message: string, status: number = HttpStatus.INTERNAL_SERVER_ERROR, error?: string): ApiResponse<null> {
    return {
      status,
      message,
      data: null,
      error,
    };
  }

  static withPaging<T>(data: T, pagination: PagingOptions, dto?: ClassConstructor<T>, message: string = "Ok"): ApiResponseWithPaging<T> {
    return {
      status: HttpStatus.OK,
      data: !dto ? plainToInstance(dto, data, { excludeExtraneousValues: false }) : data,
      message,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: pagination.totalItems,
        totalPages: Math.ceil(pagination.totalItems / pagination.pageSize),

      }
    };
  }
}
