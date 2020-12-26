import { combineReducers } from "redux";
import { TimeRecordModel } from "../../services/response.model";
import * as actionTypes from "../ActionTypes";

const mocked = require("../../services/mocks/recordsPerMonth.response.json");

type actionType = keyof {
  [actionTypes.ADD_ENTRY]: null;
  [actionTypes.DEL_ENTRY]: null;
  [actionTypes.UPD_ENTRY]: null;
  [actionTypes.TIMESHEET_RESPONSE]: null;
};

export interface TimeSheetEntryProps {
  [date: string]: TimeRecordModel[];
}

export interface ActionProps {
  type: actionType;
  date: string;
  payload: TimeSheetEntryProps;
}

function timeSheet(
  state: TimeSheetEntryProps = mocked["monthly"],
  { type, date, payload }: ActionProps
) {
  switch (type) {
    case actionTypes.ADD_ENTRY:
      const currentDate = Array.isArray(state[date]) ? state[date] : [];
      // @ts-ignore
      const addToDate = { [date]: [...currentDate, payload] };
      return {
        ...state,
        ...addToDate,
      };
    case actionTypes.DEL_ENTRY:
      const newState = { ...state };
      const values = Object.values(payload);
      newState[date] = newState[date].filter(entry => !Object.values(entry).every((v, i) => v === values[i]));
      return newState;
    case actionTypes.TIMESHEET_RESPONSE:
      return {
        ...payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  timeSheet,
});
