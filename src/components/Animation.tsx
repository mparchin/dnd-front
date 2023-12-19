import { useTheme } from "@mui/material";
import Dndsvg from "../assets/dndsvg";
import { getPrimaryColor, useThemeStore } from "../theme";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const navigate = useNavigate();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const bgColor =
    theme.palette.mode == "dark"
      ? theme.palette.grey[900]
      : theme.palette.background.default;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/menu", { replace: true });
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="animation-splash absolute w-screen h-screen z-50"
        style={{
          background: bgColor,
        }}
      >
        <div className="flex flex-col w-full h-full">
          <div className="flex-grow basis-1 flex-shrink"></div>
          <div className="flex-grow basis-1">
            <Dndsvg color={primaryColor.main} background={bgColor} />
          </div>
          <div className="flex-grow basis-1 flex-shrink"></div>
        </div>
      </div>
    </>
  );
}
