import { Slider, useTheme } from "@mui/material";
import { getPrimaryString, useThemeStore } from "../../theme";
import { useMemo } from "react";

interface DescreteSliderProps {
  label: string;
  className: string;
  defaultValue?: number;
}

export default function (props: DescreteSliderProps) {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <div className={props.className}>
      <div className="flex flex-col pt-8 pl-5 pr-5">
        <Slider
          className="pb-0"
          color={primaryString}
          defaultValue={props.defaultValue ?? 1}
          getAriaValueText={(value) => `${value}`}
          valueLabelDisplay="on"
          step={1}
          marks
          min={1}
          max={20}
        />
        <label className="text-center">{props.label}</label>
      </div>
    </div>
  );
}
