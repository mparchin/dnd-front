import { memo, useMemo } from "react";
import { useThemeStore, ThemeMode, usePrimaryColor } from "../../theme";
import { CalculateModifire } from "../../models/extraCalculations";

interface stats {
  name: string;
  value: number;
}

export const StatsBox = memo((props: stats) => {
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgImage = useMemo(
    () => ({
      backgroundImage:
        themeStore.mode == ThemeMode.light
          ? "url('/box-bg-grey.svg')"
          : "url('/box-bg-white.svg')",
    }),
    [themeStore.mode]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const modifire = CalculateModifire(props.value);
  return (
    <div className="bg-no-repeat flex flex-col w-30 h-30 m-0.5" style={bgImage}>
      <span className="text-center text-lg pt-0.5" style={coloredStyle}>
        {props.value}
      </span>
      <div className="grow text-center flex flex-col">
        <span className="grow"></span>
        <span className="text-2xl font-bold pr-2" style={coloredStyle}>
          {modifire > 0 ? `+${modifire}` : modifire}
        </span>
        <span className="grow"></span>
      </div>
      <span className="text-center align-bottom uppercase text-xs">
        {props.name}
      </span>
    </div>
  );
});
