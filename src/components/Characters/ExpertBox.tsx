import { useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import {
  useThemeStore,
  ThemeMode,
  usePrimaryColor,
  usePrimaryColorString,
} from "../../theme";
import { Circle } from "../../assets/circle";

interface ExpertBoxProps {
  name: string;
  total: string;
  attribute: string;
  proficient?: boolean;
  expert?: boolean;
  advantage?: boolean;
}

export const ExpertBox = memo((props: ExpertBoxProps) => {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();

  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/expert-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }${props.proficient || props.expert ? `-${primaryColorString}` : ""}${
        props.expert ? `-${primaryColorString}` : ""
      }.svg')`,
    }),
    [themeStore.mode, props.proficient, primaryColorString, props.expert]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="flex w-88 flex-row bg-no-repeat h-12 m-1" style={bgImage}>
      <div className="w-4"></div>
      <div className="w-12 h-full text-center flex flex-col">
        <span className="grow"></span>
        <span className="shrink uppercase text-sm">{props.attribute}</span>
        <span className="grow"></span>
      </div>
      <div className="w-32 h-full text-center flex flex-col ml-2">
        <span className="grow"></span>
        <span className="shrink capitalize">{props.name}</span>
        <span className="grow"></span>
      </div>
      <div className="w-24 h-full text-center flex flex-col ml-5">
        <span className="grow-[2]"></span>
        <span
          className="shrink uppercase text-2xl font-bold"
          style={coloredStyle}
        >
          {props.total}
        </span>
        <span className="grow-[3]"></span>
      </div>
      <div className="h-full w-6 flex flex-col">
        <div className="grow-[3]"></div>

        {props.advantage ? (
          <Circle text="A" filled color={theme.palette.success.main} />
        ) : (
          <></>
        )}

        <div className="grow-[4]"></div>
      </div>
    </div>
  );
});
