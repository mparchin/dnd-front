import { TextField } from "@mui/material";
import React, { memo } from "react";
import { usePrimaryColorString } from "../../../theme";

interface Props {
  label: string;
  value?: string;
  onChange?: (str: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

export const EditTextField = memo((p: Props) => {
  const primaryColorString = usePrimaryColorString();
  return (
    <TextField
      label={p.label}
      className="w-88 m-2"
      color={primaryColorString}
      required
      value={p.value}
      type={p.type}
      onChange={(e) => {
        if (p.onChange) p.onChange(e.target.value);
      }}
    />
  );
});
