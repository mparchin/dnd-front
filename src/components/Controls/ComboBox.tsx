import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryString } from "../../theme";

interface Props {
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

export default function (props: Props) {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <FormControl className={props.className}>
      <InputLabel
        id={`select-label-${props.lable}`}
        className="capitalize"
        color={props.colorString ?? primaryString}
      >
        {props.lable + (props.required ? " *" : "")}
      </InputLabel>
      <Select
        className="capitalize"
        labelId={`select-label-${props.lable}`}
        label={props.lable + (props.required ? " *" : "")}
        required={props.required}
        color={props.colorString ?? primaryString}
        // onChange={handleChange}
      >
        {props.options.map((option) => (
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
}
