import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as ormconfig from '../resources/config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
  ]
})
export class ApplicationModule {}
