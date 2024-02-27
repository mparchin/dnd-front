import { ReactNode, memo } from "react";
import { usePrimaryColorString } from "../../theme";
import { ExpandMore, FiberManualRecord } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

interface FilterAccordionProps {
  name: string;
  anyOptionsSelected: boolean;
  children: ReactNode;
}

export const FilterAccordion = memo((p: FilterAccordionProps) => {
  const primaryColorString = usePrimaryColorString();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <div className="flex flex-row w-full">
          <Typography className="flex-grow uppercase">{p.name}</Typography>
          {p.anyOptionsSelected ? (
            <FiberManualRecord
              fontSize="small"
              className="pr-2 pt-1"
              color={primaryColorString}
            />
          ) : (
            <></>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>{p.children}</AccordionDetails>
    </Accordion>
  );
});
