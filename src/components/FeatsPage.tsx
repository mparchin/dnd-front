import { Card, Paper, useTheme } from "@mui/material";
import DataLoading from "./DataLoading";
import { useMemo } from "react";
import { useThemeStore, usePrimaryColor, useBgColor } from "../theme";
import { Dndsvg } from "../assets/dndsvg";
import { FilterData, useFeatListStore } from "../API/feat";
import { useFeatFilterStore } from "./FeatsFilterDialog";
import { GroupedVirtuoso } from "react-virtuoso";

export default function FeatsPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const feats = useFeatListStore((state) => state.feats);
  const filter = useFeatFilterStore((state) => state);
  const query = useMemo(() => FilterData(feats, filter), [feats, filter]);
  const groupCounts = useMemo(() => {
    const featLevels = [...new Set(query.map((feat) => feat.level))];
    return featLevels.map((level) => ({
      count: query.filter((feat) => feat.level == level).length,
      level: level,
    }));
  }, [query]);
  if (feats.length == 0) return DataLoading(primaryColor);
  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );

  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  const bgColoredStyle = useMemo(() => ({ background: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div className="w-full h-full" style={bgColorStyle}>
      <GroupedVirtuoso
        className="overflow-auto box-border w-full h-full"
        groupCounts={groupCounts.map((gc) => gc.count)}
        groupContent={(index) => {
          return (
            <div className="flex p-0 flex-row leading-loose mb-4">
              <Paper
                className="flex flex-grow w-full pl-4 pr-4 pt-0.5 pb-0.5 rounded-none"
                elevation={3}
                sx={bgColorStyle}
              >
                <div>{`Level: ${groupCounts[index].level}+${
                  groupCounts[index].level >= 18 ? "(Epic boon)" : ""
                }`}</div>
                <div className="flex-grow"></div>
                <div>{`Count: ${groupCounts[index].count}`}</div>
              </Paper>
            </div>
          );
        }}
        itemContent={(index, _groupIndex) => {
          const feat = query[index];
          const html = {
            __html: feat.description
              .replace(/color:hsl\(0, 0%, 0%\);/g, "")
              .replace(/color:hsl\(0,0%,0%\);/g, ""),
          };
          return (
            <>
              <div
                className={
                  index == 0 ? "pt-4 pb-4 pl-4 pr-4" : "pb-4 pl-4 pr-4"
                }
              >
                <Card elevation={5} className="rounded-2xl pr-4 pl-4 pt-2 pb-2">
                  <div className="flex flex-col w-full">
                    <strong className="text-2xl" style={coloredStyle}>
                      {feat.name}
                    </strong>

                    <div className="text-base">
                      <strong className="pr-2">Level:</strong>
                      {`${feat.level}+${feat.level >= 18 ? "(Epic boon)" : ""}`}
                    </div>

                    <div className="text-base">
                      <strong className="pr-2">Book:</strong>
                      {feat.book}
                    </div>

                    <div className="text-base">
                      <strong className="pr-2">Prerequisite:</strong>
                      {feat.prerequisite ? feat.prerequisite : "None"}
                    </div>

                    <div className="text-base">
                      <strong className="pr-2">Repeatable:</strong>
                      {feat.repeatable ? feat.repeatable : "No"}
                    </div>
                  </div>
                  <div
                    style={bgColoredStyle}
                    className="w-full h-0.5 mt-1 mb-1"
                  ></div>
                  <div
                    className={`descriptions ${theme.palette.mode} ${
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
