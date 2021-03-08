import { DueDateService } from './due-date.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('DueDateService', () => {
    let dueDateService: DueDateService;
    let submittedDate: Date;
    let turnAround: number;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [DueDateService],
        }).compile();
        dueDateService = module.get<DueDateService>(DueDateService);
    });

    describe('given getDueDate is called with 1 hour turnAround', () => {
        it('should return a date which is 1 hour away from submitted date', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 8, 10));
            turnAround = 1;

            const expectedOutput = new Date(Date.UTC(2021, 2, 8, 11));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('given getDueDate is called with 1 work day turnAround (8 hrs)', () => {
        it('should return a date which is 1 day away from submitted date', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 8, 10));
            turnAround = 8;

            const expectedOutput = new Date(Date.UTC(2021, 2, 9, 10));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('given getDueDate is called with 2 work day turnAround (16 hrs)', () => {
        it('should return a date which is 2 days away from submitted date', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 8, 10));
            turnAround = 16;

            const expectedOutput = new Date(Date.UTC(2021, 2, 10, 10));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('given getDueDate is called with hours within todays work hours but additional minutes exceeding work hours', () => {
        it('should return a date which is 1 day away from submitted date, adding left hours to work start hours', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 8, 16, 30));
            turnAround = 1;

            const expectedOutput = new Date(Date.UTC(2021, 2, 9, 9, 30));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('given getDueDate is called with a turnAround which results the due date to be after a weekend', () => {
        it('should return a date which is after the weekend', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 12, 16));
            turnAround = 2;

            const expectedOutput = new Date(Date.UTC(2021, 2, 15, 10));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('given getDueDate is called with a turnAround which results the due date to be in the next month', () => {
        it('should return a date which is in the next month', () => {
            submittedDate = new Date(Date.UTC(2021, 2, 31, 16));
            turnAround = 2;

            const expectedOutput = new Date(Date.UTC(2021, 3, 1, 10));
            const output = dueDateService.getDueDate(submittedDate, turnAround);
            expect(output).toEqual(expectedOutput);
        });
    });
});
