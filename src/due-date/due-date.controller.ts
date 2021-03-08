import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DueDateService } from './due-date.service';
import { DueDateValidationUtil } from './validation/due-date.validation.util';

@Controller('due-date')
export class DueDateController {
    constructor(private readonly dueDateService: DueDateService) {}

    @Get('/:year/:month/:day/:hours/:minutes/:turnAround')
    getDueDate(
        @Param('year', ParseIntPipe) year: number,
        @Param('month', ParseIntPipe) month: number,
        @Param('day', ParseIntPipe) day: number,
        @Param('hours', ParseIntPipe) hours: number,
        @Param('minutes', ParseIntPipe) minutes: number,
        @Param('turnAround', ParseIntPipe) turnAround: number,
    ): Date {
        DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
        const date: Date = new Date(Date.UTC(year, month - 1, day, hours, minutes));

        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid date was provided!');
        }

        return this.dueDateService.getDueDate(date, turnAround);
    }

}
