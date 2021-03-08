import { Module } from '@nestjs/common';
import { DueDateController } from './due-date/due-date.controller';
import { DueDateService } from './due-date/due-date.service';

@Module({
  controllers: [DueDateController],
  providers: [DueDateService],
})
export class AppModule {}
