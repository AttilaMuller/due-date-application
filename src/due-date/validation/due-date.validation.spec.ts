import { BadRequestException } from '@nestjs/common';
import { DueDateValidationUtil } from './due-date.validation.util';
import { ValidationErrors } from './due-date.validation.errors';
import { dueDateInputMock } from './due-date.input.mock';

describe('DueDateValidation', () => {
    let year: number;
    let month: number;
    let day: number;
    let hours: number;
    let minutes: number;
    let turnAround: number;

    beforeEach(() => {
        year = dueDateInputMock.year;
        month = dueDateInputMock.month;
        day = dueDateInputMock.day;
        hours = dueDateInputMock.hours;
        minutes = dueDateInputMock.minutes;
        turnAround = dueDateInputMock.turnAround;
    });

    describe('given validate is called with proper inputs', () => {
        it('should not throw an Exception', () => {
            let errorThrown: boolean = false;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                errorThrown = true;
            }

            expect(errorThrown).toBe(false);
        });
    });

    describe('given validate is called with negative year', () => {
        it('should throw BadRequestException with YEAR_NOT_POSITIVE error message', () => {
            year = -1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.YEAR_NOT_POSITIVE);
            }
        });
    });

    describe('given validate is called with negative month', () => {
        it('should throw BadRequestException with INVALID_MONTH error message', () => {
            month = -1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_MONTH);
            }
        });
    });

    describe('given validate is called with non-existent month', () => {
        it('should throw BadRequestException with INVALID_MONTH error message', () => {
            month = 13;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_MONTH);
            }
        });
    });

    describe('given validate is called with negative day', () => {
        it('should throw BadRequestException with INVALID_DAY error message', () => {
            day = -1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_DAY);
            }
        });
    });

    describe('given validate is called with non-existent day', () => {
        it('should throw BadRequestException with INVALID_DAY error message', () => {
            day = 32;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_DAY);
            }
        });
    });

    describe('given validate is called with an hour which is before working days', () => {
        it('should throw BadRequestException with INVALID_HOUR error message', () => {
            hours = 8;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_HOUR);
            }
        });
    });

    describe('given validate is called with an hour which is after working days', () => {
        it('should throw BadRequestException with INVALID_HOUR error message', () => {
            hours = 18;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_HOUR);
            }
        });
    });

    describe('given validate is called with 17 hour but higher minutes than 0', () => {
        it('should throw BadRequestException with EXCEEDS_17_HRS error message', () => {
            hours = 17;
            minutes = 1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.EXCEEDS_17_HRS);
            }
        });
    });

    describe('given validate is called with negative minutes', () => {
        it('should throw BadRequestException with INVALID_MINUTES error message', () => {
            minutes = -1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_MINUTES);
            }
        });
    });

    describe('given validate is called with minutes higher than 59', () => {
        it('should throw BadRequestException with INVALID_MINUTES error message', () => {
            minutes = 60;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_MINUTES);
            }
        });
    });

    describe('given a negative turnaround is provided', () => {
        it('should throw BadRequestException with INVALID_TURNAROUND error message', () => {
            turnAround = -1;

            try {
                DueDateValidationUtil.validate(year, month, day, hours, minutes, turnAround);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message.message).toEqual(ValidationErrors.INVALID_TURNAROUND);
            }
        });
    });
});
