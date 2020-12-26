import React from "react";
import { isToday } from "../../utils/calendar.utils";
import { Day } from "./CalendarDay.styled";

export interface CalendarDayProps {
  year: number;
  month: number;
  day: number;
  activeDay: boolean;
  renderDay: (day: number) => JSX.Element;
  onClick: () => void;
}

const CalendarDay = ({
  day,
  month,
  year,
  activeDay,
  renderDay,
  onClick
}: CalendarDayProps) =>
  day ? (
    <Day
      data-day={day}
      today={isToday(year, month, day)}
      active={activeDay}
      onClick={onClick}
    >
      {day ? renderDay(day) : null}
    </Day>
  ) : (
    <Day disabled />
  );

export default CalendarDay;
