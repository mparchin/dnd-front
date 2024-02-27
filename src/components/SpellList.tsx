import { Card, Divider, Paper, Typography, useTheme } from "@mui/material";
import { AutoStories, Pets, TempleHindu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";
import { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { Dndsvg } from "../assets/dndsvg";
import { useBgColor, usePrimaryColor } from "../theme";
import { FilterData, useSpellListStore } from "../API/spell";
import DataLoading from "./DataLoading";

export default function SpellList() {
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const spells = useSpellListStore((state) => state.spells);
  const navigate = useNavigate();
  const filter = useFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(spells, filter);
  }, [spells, filter]);
  const groupCounts = useMemo(() => {
    const spellLevels = [...new Set(query.map((spell) => spell.level))].sort();
    return spellLevels.map((level) => ({
      count: query.filter((spell) => spell.level == level).length,
      level: level,
    }));
  }, [query]);

  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );
  const cardStyle = useMemo(
    () => ({
      bgcolor:
        theme.palette.mode === "dark"
          ? theme.palette.background.default
          : theme.palette.grey[200],
      color:
        theme.palette.mode === "dark" ? primaryColor.light : primaryColor.dark,
    }),
    [theme.palette.mode, primaryColor]
  );
  const dividerStyle = useMemo(
    () => ({
      color:
        theme.palette.mode == "dark" ? primaryColor.dark : primaryColor.light,
      bgcolor:
        theme.palette.mode == "dark" ? primaryColor.dark : primaryColor.light,
    }),
    [theme.palette.mode, primaryColor]
  );

  if (spells.length == 0) return DataLoading(primaryColor);

  if (query) {
    return (
      <>
        <GroupedVirtuoso
          style={bgColorStyle}
          className="overflow-auto box-border w-full h-full"
          groupCounts={groupCounts.map((gc) => gc.count)}
          groupContent={(index) => {
            return (
              <div className="flex p-0 flex-row leading-loose">
                <Paper
                  className="flex flex-grow w-full pl-4 pr-4 pt-0.5 pb-0.5 rounded-none"
                  elevation={3}
                  sx={bgColorStyle}
                >
                  <div>{`Level: ${
                    groupCounts[index].level == 0
                      ? "Cantrip"
                      : groupCounts[index].level
                  }`}</div>
                  <div className="flex-grow"></div>
                  <div>{`Count: ${groupCounts[index].count}`}</div>
                </Paper>
              </div>
            );
          }}
          itemContent={(index, groupIndex) => {
            var spell = query[index];
            return (
              <div style={bgColorStyle}>
                <div
                  className="flex flex-row overflow-hidden content-between w-full pr-4"
                  onClick={() => {
                    navigate("details", {
                      state: { spell: spell },
                    });
                  }}
                >
                  <div className="flex-grow flex-shrink basis-auto pl-4">
                    <Typography variant="body1" className="text-lg pl-1">
                      <b>{spell.name}</b>
                    </Typography>
                    <Typography variant="caption" className="text-sm pl-1">
                      {spell.schoolName}
                    </Typography>
                    <div className="flex flex-row overflow-hidden flex-wrap">
                      {spell.spellTags?.map((t) => (
                        <Card
                          key={`card-${groupIndex}-${spell.id}-${t}`}
                          variant="elevation"
                          elevation={4}
                          sx={cardStyle}
                          className="mr-1 ml-1 mt-1 pl-1 pr-1 mb-3"
                        >
                          <Typography variant="caption" className="text-xs">
                            {t.toUpperCase()}
                          </Typography>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className="flex-grow flex-shrink basis-1"></div>

                  {spell.spellListName
                    .split(",")
                    .sort()
                    .map((listName) => (
                      <div
                        key={`${spell.id}-${listName}`}
                        className="text-center flex-grow-0 basis-0 pr-1"
                      >
                        <div className="flex flex-col w-full h-full">
                          <div className="grow"></div>
                          <div>
                            {listName == "Arcane" ? (
                              <AutoStories color="primary" fontSize="small" />
                            ) : listName == "Divine" ? (
                              <TempleHindu color="secondary" fontSize="small" />
                            ) : (
                              <Pets color="success" fontSize="small" />
                            )}
                          </div>
                          <div className="grow"></div>
                        </div>
                      </div>
                    ))}
                </div>
                <Divider sx={dividerStyle} />
                {index == query.length - 1 ? (
                  <Dndsvg color={primaryColor.main} background={bgColor} />
                ) : (
                  <></>
                )}
              </div>
            );
          }}
        />
      </>
    );
  }
}
