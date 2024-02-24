import { Card, Slider, useTheme } from "@mui/material";
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
      <div className="flex flex-row">
        <Card
          className="capitalize flex flex-col text-center p-2 pt-4 pr-3 pb-4 mr-4"
          elevation={3}
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {props.label}
        </Card>
        <div className="w-full flex flex-col mr-2">
          <div className="grow"></div>
          <Slider
            color={primaryString}
            defaultValue={props.defaultValue ?? 1}
            getAriaValueText={(value) => `${value}`}
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={20}
          />
          <div className="grow"></div>
        </div>
      </div>
    </div>
  );
}
