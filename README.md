## Description

This application was made with [Nest](https://github.com/nestjs/nest) framework. The application is used to calculate due dates of given tasks.

Input: Takes the submit date/time and turnaround time.
Output: Returns the date/time when the issue is resolved.

## Rules

Working hours are from 9AM to 5PM on every working day, Monday to Friday.
Holidays should be ignored (e.g. A holiday on a Thursday is considered as a
working day. A working Saturday counts as a non-working day.).
The turnaround time is defined in working hours (e.g. 2 days equal 16 hours).
If a problem was reported at 2:12PM on Tuesday and the turnaround time is
16 hours, then it is due by 2:12PM on Thursday.
A problem can only be reported during working hours. (e.g. All submit date
values are set between 9AM to 5PM.)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Calling the server

```bash
# make a get request
localhost:3000/due-date/:year/:month/:day/:hours/:minutes/:turnAround

# example
localhost:3000/due-date/2021/3/8/10/30/8
```

## Test

```bash
# unit tests
$ npm run test
```
