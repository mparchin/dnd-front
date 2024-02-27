import { Paper, Typography } from "@mui/material";
import { usePrimaryColorString } from "../theme";
import { memo } from "react";

export const ComingSoon = memo(() => {
  const primaryString = usePrimaryColorString();

  return (
    <Paper className="w-full h-full pt-24">
      <Typography
        className="text-center align-middle"
        variant="h4"
        color={primaryString}
      >
        Coming soon !!!
      </Typography>
    </Paper>
  );
});
