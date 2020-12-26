import { TimeRecordModel, TimeSheetEntryProps } from "../../services/response.model";
import * as ActionTypes from "../ActionTypes";

export const getDateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

export const addMockedTimeSheetToDay = (date: Date) => ({
  type: ActionTypes.ADD_ENTRY,
  date: getDateKey(date),
  payload: {
    hours: 0,
    description: '',
    project: null,
    edit: true
  },
});

export const removeTimeEntry = (timeRecord: TimeRecordModel, date: Date) => ({
  type: ActionTypes.DEL_ENTRY,
  date: getDateKey(date),
  payload: timeRecord,
});


export type requestTimeSheetType = {
  type: typeof ActionTypes.TIMESHEET_REQUEST;
  payload: Date;
}

export const requestTimeSheet = (d: Date): requestTimeSheetType => ({
  type: ActionTypes.TIMESHEET_REQUEST,
  payload: d
});

export const loadTimeSheet = (month: Date, timeRecords?: TimeSheetEntryProps) => ({
  type: ActionTypes.TIMESHEET_RESPONSE,
  date: getDateKey(month),
  payload: timeRecords,
});
