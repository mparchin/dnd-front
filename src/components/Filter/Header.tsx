import { ArrowBackIosNew, FilterAltOff } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { memo } from "react";

interface HeaderProps {
  className?: string;
  primaryColorString: any;
  Clear: () => void;
  CloseRequest: () => void;
}

export const Header = memo((props: HeaderProps) => (
  <div className={props.className}>
    <div className="flex-grow basis-0 pt-2 pl-2">
      <IconButton onClick={props.CloseRequest}>
        <ArrowBackIosNew color={props.primaryColorString} />
      </IconButton>
    </div>
    <div className="grow-[3] basis-0 pt-4 text-center">
      <Typography color={props.primaryColorString}>Filters</Typography>
    </div>
    <div className="flex-grow basis-0 pt-2 pr-4 text-right">
      <IconButton onClick={props.Clear}>
        <FilterAltOff color={props.primaryColorString} />
      </IconButton>
    </div>
  </div>
));
