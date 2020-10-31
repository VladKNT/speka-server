import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AssignTeamMemberDto {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: "Team member's id",
    example: "345bjklsdv-2323rsv-2sacv2-23vdv",
  })
  teamMemberId: string;
}
