import { TextField } from "@mui/material";
import { usePrimaryColorString } from "../../theme";
import { memo } from "react";

interface ExtraFieldProps {
  className?: string;
  colorString?: any;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (str: string) => void;
}

export const ExtraField = memo((p: ExtraFieldProps) => {
  const primaryColorString = usePrimaryColorString();
  return (
    <div className={p.className}>
      <TextField
        label={p.label ?? "Extra"}
        fullWidth
        color={p.colorString ?? primaryColorString}
        helperText="Eg. INT+3 / Prof-2 / 3 / charisma / level * 2"
        required={p.required}
        value={p.value}
        onChange={(e) => {
          if (p.onChange) p.onChange(e.target.value);
        }}
      />
    </div>
  );
});
