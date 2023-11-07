import { Paper, Typography, useTheme } from "@mui/material";
import { getPrimaryString, useThemeStore } from "../theme";
import { useMemo } from "react";

export default function CommingSoon() {
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);

  return (
    <Paper className="w-full h-full pt-24">
      <Typography
        className="text-center align-middle"
        variant="h4"
        color={primaryString}
      >
        Comming soon !!!
      </Typography>
    </Paper>
  );
}
