import React, { ChangeEvent } from "react";

interface Props {
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const DescriptionEntry = ({ onChange, value }: Props) => {
  return (
    <input
      name="descriptionEntry"
      type="text"
      onChange={onChange}
      value={value}
    />
  );
};

export default DescriptionEntry;
