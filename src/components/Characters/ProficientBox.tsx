import { useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import {
  useThemeStore,
  ThemeMode,
  usePrimaryColor,
  usePrimaryColorString,
} from "../../theme";
import { Circle } from "../../assets/circle";

interface ProficientBoxProps {
  name: string;
  advantage?: boolean;
  isProficient?: boolean;
  total: string;
}

export const ProficientBox = memo((props: ProficientBoxProps) => {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();

  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/proficient-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }${props.isProficient ? `-${primaryColorString}.svg` : ".svg"}')`,
    }),
    [themeStore.mode, props.isProficient]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="flex flex-row bg-no-repeat h-16 w-88 m-1" style={bgImage}>
      <div className="w-5"></div>
      <div className="w-36 h-full text-center flex flex-col">
        <span className="grow"></span>
        <span className="shrink uppercase text">{props.name}</span>
        <span className="grow"></span>
      </div>
      <div className="w-32 h-full text-center flex flex-col ml-8">
        <span className="grow"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={coloredStyle}
        >
          {props.total}
        </span>
        <span className="grow"></span>
      </div>
      <div className="h-full w-6 flex flex-col">
        <div className="grow"></div>

        {props.advantage ? (
          <Circle text="A" filled color={theme.palette.success.main} />
        ) : (
          <></>
        )}

        <div className="grow"></div>
      </div>
    </div>
  );
});
