import React, { ChangeEvent } from "react";

interface Props {
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const TimeEntry = ({ onChange, value }: Props) => {
  return <input name="timeEntry" type="number" onChange={onChange} value={value} />;
};

export default TimeEntry;
