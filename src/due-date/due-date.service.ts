import { Injectable } from '@nestjs/common';

@Injectable()
export class DueDateService {

    /*  Calculates due date based on submitted date and turnaround
        returns due date
    */
    getDueDate(submittedDate: Date, turnaroundHrs: number): Date {
        return submittedDate;
    }
}
