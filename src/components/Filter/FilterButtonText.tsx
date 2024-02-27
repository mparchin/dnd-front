import { Check } from "@mui/icons-material";
import { usePrimaryColorString } from "../../theme";
import { memo } from "react";

interface FilterButtonTextProps {
  text: string;
  checkCondition: boolean;
  primaryColorString?: any;
}

export const FilterButtonText = memo((p: FilterButtonTextProps) => {
  const colorString = p.primaryColorString ?? usePrimaryColorString();
  return (
    <>
      <div className="flex-grow text-left">{p.text}</div>
      <div className="flex-shrink-0">
        {p.checkCondition ? <Check color={colorString} /> : <></>}
      </div>
    </>
  );
});
