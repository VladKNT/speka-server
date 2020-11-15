import { ApiProperty } from "@nestjs/swagger";

import { Component } from "../../../database/models/component.entity";
import { ComponentDetails } from "../../../database/models/component-details.entity";


export class ComponentWithDetailsInterface {
  @ApiProperty({
    type: Component,
    required: true,
    description: "Component info"
  })
  readonly component: Component;

  @ApiProperty({
    required: true,
    type: ComponentDetails,
    description: "Component details info"
  })
  readonly componentDetails: ComponentDetails;
}
