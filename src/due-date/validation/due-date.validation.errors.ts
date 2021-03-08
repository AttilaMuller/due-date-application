export enum ValidationErrors {
    YEAR_NOT_POSITIVE = 'Year is not a positive number',
    INVALID_MONTH  = 'Month is not between 1 and 12',
    INVALID_DAY = 'Day is not between 1 and 31',
    INVALID_HOUR = 'Hour is not between 9 and 17',
    EXCEEDS_17_HRS  = 'Time exceeds 17:00',
    INVALID_MINUTES = 'Day is not between 0 and 59',
    INVALID_TURNAROUND = 'Turnaround is not a positive number',
}
