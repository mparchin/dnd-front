import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { usePrimaryColorString } from "../../theme";
import { memo } from "react";

interface ComboBoxProps {
  lable: string;
  required?: boolean;
  className?: string;
  options: Option[];
  colorString?: any;
}

interface Option {
  value: number;
  text: string;
}

export const ComboBox = memo((p: ComboBoxProps) => {
  const primaryString = usePrimaryColorString();
  return (
    <FormControl className={p.className}>
      <InputLabel
        id={`select-label-${p.lable}`}
        className="capitalize"
        color={p.colorString ?? primaryString}
      >
        {p.lable + (p.required ? " *" : "")}
      </InputLabel>
      <Select
        value={1}
        className="capitalize"
        labelId={`select-label-${p.lable}`}
        label={p.lable + (p.required ? " *" : "")}
        required={p.required}
        color={p.colorString ?? primaryString}
        // onChange={handleChange}
      >
        {p.options.map((option) => (
          <MenuItem
            value={option.value}
            key={option.value}
            className="capitalize"
          >
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
