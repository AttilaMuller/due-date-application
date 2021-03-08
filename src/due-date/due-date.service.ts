import { Injectable } from '@nestjs/common';
import { WORK_HRS, WORK_ENDS_HRS, WEEKENDS, WORK_STARTS_HRS } from './due-date.constants';
import { ExtraDayInformation } from './due-date.model';

@Injectable()
export class DueDateService {

    /*  Calculates due date based on submitted date and turnaround
        returns due date
    */
    getDueDate(submittedDate: Date, turnaroundHrs: number): Date {
        const dueDate: Date = new Date(submittedDate);

        let daysNeeded: number = Math.floor(turnaroundHrs / WORK_HRS);
        let hoursLeft: number = turnaroundHrs >= WORK_HRS ? turnaroundHrs % WORK_HRS : turnaroundHrs;

        const { extraDay, extraDayHoursLeft } = this.getExtraDayInformation(submittedDate, hoursLeft);

        if (extraDay) {
            hoursLeft = extraDayHoursLeft;
            daysNeeded++;
            dueDate.setUTCHours(WORK_STARTS_HRS + hoursLeft);
        } else {
            dueDate.setUTCHours(dueDate.getUTCHours() + hoursLeft);
        }

        daysNeeded += this.getExtraDaysFromWeekends(submittedDate, daysNeeded);
        dueDate.setUTCDate(dueDate.getDate() + daysNeeded);

        return dueDate;
    }

    /*  Calculates extra days if user exceeds day's work hour limit by hours or by minutes
        returns extra days and also the hours which are left for the last day
    */
    private getExtraDayInformation(submittedDate: Date, hoursLeft: number): ExtraDayInformation {
        const dateWithHoursLeftAdded: Date = new Date(submittedDate);
        dateWithHoursLeftAdded.setUTCHours(submittedDate.getUTCHours() + hoursLeft);

        const isWorkHoursExceededByHours: boolean = dateWithHoursLeftAdded.getUTCHours() > WORK_ENDS_HRS;
        const isLastHourExceededByMinutes: boolean = dateWithHoursLeftAdded.getUTCHours() === 17 && dateWithHoursLeftAdded.getMinutes() > 0;
        const extraDay: number = (isWorkHoursExceededByHours || isLastHourExceededByMinutes) ? 1 : 0;
        const extraDayHoursLeft: number = extraDay ? dateWithHoursLeftAdded.getUTCHours() - WORK_ENDS_HRS : 0;

        return {
            extraDay,
            extraDayHoursLeft,
        };
    }

    /*  Calculates extra days which should be added because of weekends
        returns extra days
    */
    private getExtraDaysFromWeekends(submittedDate: Date, daysNeeded: number): number {
        let day: number = submittedDate.getDay() + 1;
        let weekEnds: number = 0;

        while (daysNeeded !== 0) {
            if (WEEKENDS.includes(day)) {
                weekEnds++;
            } else {
                daysNeeded--;
            }

            day = day === 6 ? 0 : day + 1;
        }

        return weekEnds;
    }
}
