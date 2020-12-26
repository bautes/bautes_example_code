import React from "react";
import { TimeRecordModel } from "../../services/response.model";
import * as Styled from "./DayEntries.styled";
import DayEntry from "./DayEntry";

interface Props {
  entries: TimeRecordModel[];
  onRemove: (entry: TimeRecordModel) => void;
}

const DayEntries = ({ entries, onRemove }: Props) => {
  return (
    <Styled.Entries>
      {entries.length
        ? entries.map((entry, id) => (
            <Styled.Entry key={id}>
              <DayEntry entry={entry} onRemoveEntry={onRemove} />
            </Styled.Entry>
          ))
        : null}
      {entries.length ? (
        <Styled.DayFooter>
          {entries.reduce((acc, entry) => entry.hours + acc, 0)} hours total
        </Styled.DayFooter>
      ) : null}
    </Styled.Entries>
  );
};

export default DayEntries;
