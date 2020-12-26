import React, { useState } from "react";
import { TimeRecordModel } from "../../services/response.model";
import TimeRecord from "../time-record/TimeRecord";
import * as Styled from "./DayEntries.styled";

const formatDescription = (entry: TimeRecordModel) =>
  `${entry.project}: ${entry.description}`;
const formatHours = (entry: TimeRecordModel) => `${entry.hours} hours`;

export interface ViewDayEntryProps {
  entry: TimeRecordModel;
  onToggle: () => void;
}

export const ViewDayEntry = ({ entry, onToggle }: ViewDayEntryProps) => (
  <small onDoubleClick={onToggle}>
    <b>{formatHours(entry)}&nbsp;</b>
    {formatDescription(entry)}
  </small>
);

export interface EditDayEntryProps extends ViewDayEntryProps {
  onChange: () => void;
}

const EditDayEntry = ({ entry, onToggle, onChange }: EditDayEntryProps) => (
  <small onDoubleClick={onToggle}>
    <TimeRecord onChange={onChange} entry={entry} />
  </small>
);

export interface DayProps {
  entry: TimeRecordModel;
  onRemoveEntry: (entry: TimeRecordModel) => void;
}

const DayEntry = ({ entry, onRemoveEntry }: DayProps) => {
  const [edit, toggleEdit] = useState<boolean>(!!entry.edit);
  const onChange = () => null;
  return (
    <Styled.DayWrapper>
      <Styled.RemoveButton onClick={() => onRemoveEntry(entry)} />
      {edit ? (
        <EditDayEntry
          entry={entry}
          onToggle={() => toggleEdit(!edit)}
          onChange={onChange}
        />
      ) : (
        <ViewDayEntry entry={entry} onToggle={() => toggleEdit(!edit)} />
      )}
    </Styled.DayWrapper>
  );
};

export default DayEntry;
