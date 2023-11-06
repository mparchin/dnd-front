import { useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";
import { getPrimaryColor, useThemeStore } from "../theme";
import { useMemo } from "react";

interface IFilterButtonText {
  text: string;
  checkCondition: boolean;
}

export default function (args: IFilterButtonText) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <>
      <div className="flex-grow text-left">{args.text}</div>
      <div className="flex-shrink-0">
        {args.checkCondition ? (
          <Check
            style={{
              color: primaryColor.main,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
