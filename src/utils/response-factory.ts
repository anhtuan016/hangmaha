import { HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiResponseWithPaging } from "../types/api-response";
import { ClassConstructor, plainToInstance } from "class-transformer";

export class ResponseFactory {
  static success<T>(
    data: T,
    dto?: ClassConstructor<T>,
    message: string = "Ok"
  ): ApiResponse<T> {
    return {
      status: HttpStatus.OK,
      message,
      data: !dto
        ? plainToInstance(dto, data, { excludeExtraneousValues: false })
        : data,
    };
  }

  static error(
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    error?: string
  ): ApiResponse<null> {
    return {
      status,
      message,
      data: null,
      error,
    };
  }

  static withPaging<T>(
    data: T,
    page: number,
    pageSize: number,
    totalItems: number,
    dto?: ClassConstructor<T>,
    message: string = "Ok"
  ): ApiResponseWithPaging<T> {
    return {
      status: HttpStatus.OK,
      data: !dto
        ? plainToInstance(dto, data, { excludeExtraneousValues: false })
        : data,
      message,
      page,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }
}
