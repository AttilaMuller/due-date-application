import { BadRequestException } from '@nestjs/common';
import { ValidationErrors } from './due-date.validation.errors';

export namespace DueDateValidationUtil {
    export function validate(year: number, month: number, day: number, hours: number, minutes: number, turnAround: number) {
        validateYear(year);
        validateMonth(month);
        validateDay(day);
        validateHours(hours, minutes);
        validateMinutes(minutes);
        validateTurnAround(turnAround);
    }

    function validateYear(year: number) {
        if (year < 1) {
            throw new BadRequestException(ValidationErrors.YEAR_NOT_POSITIVE);
        }
    }

    function validateMonth(month: number) {
        if (month < 1 || month > 12) {
            throw new BadRequestException(ValidationErrors.INVALID_MONTH);
        }
    }

    function validateDay(day: number) {
        if (day < 1 || day > 31) {
            throw new BadRequestException(ValidationErrors.INVALID_DAY);
        }
    }

    function validateHours(hours: number, minutes: number) {
        if (hours < 9 || hours > 17) {
            throw new BadRequestException(ValidationErrors.INVALID_HOUR);
        }

        if (hours === 17 && minutes > 0) {
            throw new BadRequestException(ValidationErrors.EXCEEDS_17_HRS);
        }
    }

    function validateMinutes(minutes: number) {
        if (minutes < 0 || minutes > 59) {
            throw new BadRequestException(ValidationErrors.INVALID_MINUTES);
        }
    }

    function validateTurnAround(hours: number) {
        if (hours < 0) {
            throw new BadRequestException(ValidationErrors.INVALID_TURNAROUND);
        }
    }
}
