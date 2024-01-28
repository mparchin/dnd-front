import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";

interface CircleProps {
  className?: string;
  filled?: boolean;
  text: string;
}

export default function (props: CircleProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={props.className}
    >
      <circle
        fill={props.filled ? primaryColor.main : "none"}
        cx="5"
        cy="5"
        r="4"
        stroke="currentColor"
      />
      <text
        x="3"
        y="7"
        fill="currentColor"
        className="uppercase"
        style={{ fontSize: "0.4rem" }}
      >
        {props.text}
      </text>
    </svg>
  );
}
