import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";
import { Virtuoso } from "react-virtuoso";
import { useFeatureListStore } from "../API/feature";
import Dndsvg from "../assets/dndsvg";

export default function ClassesPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const features = useFeatureListStore((state) => state.features);

  var query = features;

  query.sort((a, b) =>
    a.className > b.className
      ? 1
      : a.className < b.className
      ? -1
      : a.level > b.level
      ? 1
      : a.level < b.level
      ? -1
      : (a.order ?? 0) > (b.order ?? 0)
      ? 1
      : -1
  );

  return (
    <div
      className="w-full h-full pt-2"
      style={{
        backgroundColor:
          theme.palette.mode == "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.default,
      }}
    >
      <Virtuoso
        style={{
          height: "100%",
          width: "100%",
        }}
        className="overflow-auto box-border"
        data={query}
        itemContent={(index, feature) => (
          <>
            <div className="pt-2 pl-4 pr-4 pb-2">
              <div className="flex flex-row w-full">
                <strong
                  className="text-lg"
                  style={{ color: primaryColor.main }}
                >
                  {feature.name}
                </strong>
              </div>
              <div
                className={`pl-2 pr-2 conditions ${theme.palette.mode} ${
                  themeStore.isPrimarySwapped ? "swappedColors" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: feature.description
                    .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                    .replace(/color:hsl\(0,0%,0%\);/g, ""),
                }}
              />
            </div>
            {index == query.length - 1 ? (
              <Dndsvg
                color={
                  theme.palette.mode == "dark"
                    ? primaryColor.main
                    : primaryColor.main
                }
                background={
                  theme.palette.mode == "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.background.default
                }
              />
            ) : (
              <></>
            )}
          </>
        )}
      />
    </div>
  );
}