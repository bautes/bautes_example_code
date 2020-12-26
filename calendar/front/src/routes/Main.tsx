import React, { useEffect, useState } from "react";
import Calendar from "../components/calendar/Calendar";
import * as Styled from "./Main.styled";
import * as actions from "../redux/actions";

import { useDispatch, useSelector } from "react-redux";
import DayEntries from "../components/day-entries/DayEntries";
import {
  TimeRecordModel,
  TimeSheetEntryProps,
} from "../services/response.model";
import { getDateKey } from "../redux/actions";

const createEntriesForDayFn = (store: TimeSheetEntryProps) => (
  d: Date
): TimeRecordModel[] => {
  const key = getDateKey(d);
  return store[key] ? store[key] : [];
};

export const Main = () => {
  const [date, setInitialDate] = useState(new Date());
  const dispatch = useDispatch();
  const getEntriesForDay = useSelector(
    ({ timeSheet }: { timeSheet: TimeSheetEntryProps }) =>
      createEntriesForDayFn(timeSheet)
  );

  useEffect(() => {
    dispatch(actions.requestTimeSheet(date));
  }, [date, dispatch]);

  const addEntryToDay = (d: Date) =>
    dispatch(actions.addMockedTimeSheetToDay(d));

  const removeEntryToDay = (entry: TimeRecordModel, d: Date) =>
    dispatch(actions.removeTimeEntry(entry, d));

  const extractMonth = (d: Date) =>
    d.toDateString().replace(/(\w+)\s(\w+)\s(\d+)\s(\d+)/, "$2 $4");

  return (
    <Styled.Wrapper>
      <Styled.Title>{extractMonth(date)}</Styled.Title>
      <Calendar
        initialDate={date}
        onChange={setInitialDate}
        onEnter={addEntryToDay}
        renderDay={(d: Date) => (
          <DayEntries
            entries={getEntriesForDay(d)}
            onRemove={(entry) => removeEntryToDay(entry, d)}
          />
        )}
      />
    </Styled.Wrapper>
  );
};
