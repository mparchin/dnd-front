import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";
import { Virtuoso } from "react-virtuoso";
import { FilterData, useFeatureListStore } from "../API/feature";
import Dndsvg from "../assets/dndsvg";
import { useClassFilterStore } from "./ClassesFilterDialog";

export default function ClassesPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const filter = useClassFilterStore((state) => state);
  const features = useFeatureListStore((state) => state.features);
  const query = useMemo(() => FilterData(features, filter), [features, filter]);

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
                  className="text-lg flex-grow"
                  style={{ color: primaryColor.main }}
                >
                  {feature.name}
                </strong>
                {feature.subclass &&
                !(
                  feature.name.toLowerCase() == feature.subclass.toLowerCase()
                ) ? (
                  <span
                    style={{ color: primaryColor.main }}
                    className="text-xs mt-auto mb-auto pl-0.5"
                  >
                    {feature.subclass}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={`pl-2 pr-2 descriptions ${theme.palette.mode} ${
                  themeStore.isPrimarySwapped ? "swappedColors" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: feature.description
                    .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                    .replace(/color:hsl\(0,0%,0%\);/g, "")
                    .replace(/style="width:\d*.\d*%;"/g, "")
                    .replace(/list-style-type:circle;/g, "")
                    .replace(/list-style-type:disc;/g, ""),
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
