import { Card, Paper, useTheme } from "@mui/material";
import DataLoading from "./DataLoading";
import { useMemo } from "react";
import { useThemeStore, getPrimaryColor } from "../theme";
import Dndsvg from "../assets/dndsvg";
import { FilterData, useFeatListStore } from "../API/feat";
import { useFeatFilterStore } from "./FeatsFilterDialog";
import { GroupedVirtuoso } from "react-virtuoso";

export default function FeatsPage() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const feats = useFeatListStore((state) => state.feats);
  const filter = useFeatFilterStore((state) => state);
  const query = useMemo(
    () =>
      FilterData(feats, filter).sort((a, b) =>
        Number(a.level) > Number(b.level)
          ? 1
          : Number(a.level) < Number(b.level)
          ? -1
          : a.name > b.name
          ? 1
          : -1
      ),
    [feats, filter]
  );
  const groupCounts = useMemo(() => {
    const featLevels = [...new Set(query.map((feat) => feat.level))];
    return featLevels.map((level) => ({
      count: query.filter((feat) => feat.level == level).length,
      level: level,
    }));
  }, [query]);
  if (feats.length == 0) return DataLoading(primaryColor);

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundColor:
          theme.palette.mode == "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.default,
      }}
    >
      <GroupedVirtuoso
        style={{
          height: "100%",
          width: "100%",
          backgroundColor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        }}
        className="overflow-auto box-border"
        groupCounts={groupCounts.map((gc) => gc.count)}
        groupContent={(index) => {
          return (
            <div className="flex p-0 flex-row leading-loose">
              <Paper
                className="flex flex-grow w-full pl-4 pr-4 pt-0.5 pb-0.5 rounded-none"
                elevation={3}
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.background.default,
                }}
              >
                <div>{`Level: ${groupCounts[index].level}`}</div>
                <div className="flex-grow"></div>
                <div>{`Feats: ${groupCounts[index].count}`}</div>
              </Paper>
            </div>
          );
        }}
        itemContent={(index, _groupIndex) => {
          var feat = query[index];
          return (
            <>
              <div className="pt-4 pl-4 pr-4">
                <Card elevation={5} className="rounded-2xl pr-4 pl-4 pt-2 pb-2">
                  <div className="flex flex-col w-full">
                    <strong
                      className="text-2xl"
                      style={{ color: primaryColor.main }}
                    >
                      {feat.name}
                    </strong>

                    <div className="text-base">
                      <strong className="pr-2">Level:</strong>
                      {feat.level}
                    </div>

                    <div className="text-base">
                      <strong className="pr-2">Prerequisite:</strong>
                      {feat.prerequisite ? feat.prerequisite : "None"}
                    </div>
                  </div>
                  <div
                    style={{ background: primaryColor.main }}
                    className="w-full h-0.5 mt-1 mb-1"
                  ></div>
                  <div
                    className={`descriptions ${theme.palette.mode} ${
                      themeStore.isPrimarySwapped ? "swappedColors" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: feat.description
                        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                        .replace(/color:hsl\(0,0%,0%\);/g, ""),
                    }}
                  />
                </Card>
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
          );
        }}
      />
    </div>
  );
}
