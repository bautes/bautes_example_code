import React, { ChangeEvent, useRef } from "react";
import DescriptionEntry from "../description-entry/DescriptionEntry";
import TimeEntry from "../time-entry/TimeEntry";
import ProjectsList from "../projects-list/ProjectsList";
import { TimeRecordModel } from "../../services/response.model";
import * as Styled from "./TimeRecord.styled";
import { useEnter } from "../../utils/useKeys";

export interface TimeRecordProps {
  ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  type: keyof TimeRecordModel;
}

interface Props {
  entry: TimeRecordModel;
  onChange: (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: keyof TimeRecordModel
  ) => void;
}

const TimeRecord = ({ entry, onChange }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  // @ts-ignore
  useEnter((...args) => {
    console.log(args);
  }, ref);

  return (
    <Styled.Wrapper ref={ref}>
      <TimeEntry onChange={(ev) => onChange(ev, "hours")} value={entry.hours} />
      <DescriptionEntry onChange={(ev) => onChange(ev, "description")} value={entry.description} />
      <ProjectsList onChange={(ev) => onChange(ev, "project")} value={entry.project} />
    </Styled.Wrapper>
  );
};

export default TimeRecord;
