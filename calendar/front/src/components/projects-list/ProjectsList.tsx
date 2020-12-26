import React, { ChangeEvent } from "react";

interface Props {
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
}

const DescriptionEntry = ({ onChange, value }: Props) => {
  return (
    <select name="descriptionEntry" onChange={onChange}>
      <option value={value}>projects here</option>
    </select>
  );
};

export default DescriptionEntry;
