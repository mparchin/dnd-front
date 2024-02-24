import { TextField, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryString } from "../../theme";

interface Props {
  className?: string;
  colorString?: any;
  label?: string;
  required?: boolean;
}

export default function (props: Props) {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <div className={props.className}>
      <TextField
        label={props.label ?? "Extra"}
        fullWidth
        color={props.colorString ?? primaryString}
        helperText="Eg. INT+3 / Prof-2 / 3 / charisma / level"
        required={props.required}
      />
    </div>
  );
}
