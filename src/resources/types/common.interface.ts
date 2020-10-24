import { ApiProperty } from "@nestjs/swagger";

export class PaginationInterface {
  @ApiProperty({ type: Number, example: 1, description: "Page number" })
  page: number;

  @ApiProperty({ type: Number, example: 10, description: "Amount of items" })
  limit: number;
}
