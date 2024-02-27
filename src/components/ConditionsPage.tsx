import { Card, useTheme } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { useConditionListStore } from "../API/conditions";
import DataLoading from "./DataLoading";
import { useMemo } from "react";
import { useThemeStore, usePrimaryColor, useBgColor } from "../theme";
import { Dndsvg } from "../assets/dndsvg";
import { useFilterStore } from "./FilterDialog";

export default function ConditionsPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const conditions = useConditionListStore((state) => state.conditions);
  const conditionSearchString = useFilterStore(
    (state) => state.conditionSearchString
  );

  if (conditions.length == 0) return DataLoading(primaryColor);
  var query = conditions.sort((a, b) => (a.name > b.name ? 1 : -1));
  if (conditionSearchString)
    query = query.filter((condition) =>
      condition.name.toLowerCase().includes(conditionSearchString.toLowerCase())
    );

  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="w-full h-full" style={bgColorStyle}>
      <Virtuoso
        className="overflow-auto box-border w-full h-full"
        data={query}
        itemContent={(index, condition) => {
          const html = {
            __html: condition.description
              .replace(/color:hsl\(0, 0%, 0%\);/g, "")
              .replace(/color:hsl\(0,0%,0%\);/g, ""),
          };
          return (
            <>
              <div className="pt-2 pl-4 pr-4 pb-2">
                <Card elevation={5} className="rounded-2xl pr-4 pl-4 pt-2 pb-2">
                  <div className="flex flex-row w-full">
                    <strong className="text-lg" style={coloredStyle}>
                      {condition.name}
                    </strong>
                  </div>
                  <div
                    className={`pl-2 pr-2 conditions ${theme.palette.mode} ${
                      themeStore.isPrimarySwapped ? "swappedColors" : ""
                    }`}
                    dangerouslySetInnerHTML={html}
                  />
                </Card>
              </div>
              {index == query.length - 1 ? (
                <Dndsvg color={primaryColor.main} background={bgColor} />
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
