import { Card, Slider } from "@mui/material";
import { usePrimaryColorString } from "../../theme";
import { memo } from "react";

interface DescreteSliderProps {
  label: string;
  className: string;
  defaultValue?: number;
}

export const DescreteSlider = memo((p: DescreteSliderProps) => {
  const primaryString = usePrimaryColorString();
  return (
    <div className={p.className}>
      <div className="flex flex-row">
        <Card
          className="capitalize text-vertical-lr flex flex-col text-center p-2 pt-4 pr-3 pb-4 mr-4"
          elevation={3}
        >
          {p.label}
        </Card>
        <div className="w-full flex flex-col mr-2">
          <div className="grow"></div>
          <Slider
            color={primaryString}
            defaultValue={p.defaultValue ?? 1}
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
});
