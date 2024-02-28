import { memo, useMemo } from "react";
import { useThemeStore, ThemeMode, usePrimaryColor } from "../../theme";

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
  const modifire = Math.floor((props.value - 10) / 2);
  return (
    <div className="bg-no-repeat flex flex-col w-28 h-28 m-1" style={bgImage}>
      <span className="grow text-center text-xl" style={coloredStyle}>
        {props.value}
      </span>
      <div className="grow-[100] text-center flex flex-col">
        <span className="grow"></span>
        <span className="shrink-0 text-2xl font-bold" style={coloredStyle}>
          {modifire > 0 ? `+${modifire}` : modifire}
        </span>
        <span className="grow"></span>
      </div>
      <span className="grow text-center align-bottom uppercase text-xs">
        {props.name}
      </span>
    </div>
  );
});
