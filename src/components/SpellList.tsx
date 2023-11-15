import { Card, Divider, Paper, Typography, useTheme } from "@mui/material";
import { AutoStories, Pets, TempleHindu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";
import { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import Dndsvg from "../assets/dndsvg";
import { getPrimaryColor, useThemeStore } from "../theme";
import { FilterData, useSpellListStore } from "../API/spell";
import DataLoading from "./DataLoading";

export default function SpellList() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const spells = useSpellListStore((state) => state.spells);
  const navigate = useNavigate();
  const filter = useFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(spells, filter)
  }, [spells, filter]);
  const groupCounts = useMemo(() => {
    const spellLevels = [...new Set(query.map((spell) => spell.level))].sort();
    return spellLevels.map((level) => ({
      count: query.filter((spell) => spell.level == level).length,
      level: level,
    }));
  }, [query]);

  if (spells.length == 0) return DataLoading(primaryColor);

  if (query) {
    return (
      <>
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
                  <div>{`Spells: ${groupCounts[index].count}`}</div>
                </Paper>
              </div>
            );
          }}
          itemContent={(index, groupIndex) => {
            var spell = query[index];
            return (
              <div
                className="pt-2"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.background.default,
                }}
              >
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
                          sx={{
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? theme.palette.background.default
                                : theme.palette.grey[200],
                            color:
                              theme.palette.mode === "dark"
                                ? primaryColor.light
                                : primaryColor.dark,
                          }}
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
                          <div className="flex-grow flex-shrink"></div>
                          <div>
                            {listName == "Arcane" ? (
                              <AutoStories color="primary" fontSize="small" />
                            ) : listName == "Divine" ? (
                              <TempleHindu color="secondary" fontSize="small" />
                            ) : (
                              <Pets color="success" fontSize="small" />
                            )}
                          </div>
                          <Typography
                            variant="caption"
                            className="text-xs flex-grow basis-auto"
                            sx={{
                              color:
                                listName == "Arcane"
                                  ? theme.palette.primary.main
                                  : listName == "Divine"
                                  ? theme.palette.secondary.main
                                  : theme.palette.success.main,
                            }}
                          ></Typography>
                        </div>
                      </div>
                    ))}
                </div>
                <Divider
                  sx={{
                    color:
                      theme.palette.mode == "dark"
                        ? primaryColor.dark
                        : primaryColor.light,
                    bgcolor:
                      theme.palette.mode == "dark"
                        ? primaryColor.dark
                        : primaryColor.light,
                  }}
                />
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
              </div>
            );
          }}
        />
        {/* <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            "& ul": { padding: 0 },
          }}
          style={{
            backgroundColor:
              theme.palette.mode == "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.default,
          }}
          className="overflow-auto box-border"
          subheader={<li />}
        >
          {spellLevels.map((sectionId) => (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListSubheader className="flex p-0 flex-row leading-loose">
                  <Paper
                    className="flex flex-grow w-full pl-4 pr-4 rounded-none"
                    elevation={3}
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[900]
                          : theme.palette.background.default,
                    }}
                  >
                    <div>{`Level: ${sectionId}`}</div>
                    <div className="flex-grow"></div>
                    <div>
                      {`Spells: ${
                        query.filter((spell) => spell.level == sectionId).length
                      }`}
                    </div>
                  </Paper>
                </ListSubheader>
                {query
                  .filter((spell) => spell.level == sectionId)
                  .sort((a, b) =>
                    a.name == b.name ? 0 : a.name > b.name ? 1 : -1
                  )
                  .map((spell) => (
                    <div
                      key={`item-${sectionId}-${spell.id}`}
                      onClick={() => {
                        navigate("details", {
                          state: { spell: spell },
                        });
                      }}
                    >
                      <ListItemButton
                        style={{
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? theme.palette.grey[900]
                              : theme.palette.background.default,
                        }}
                      >
                        <div className="flex flex-row overflow-hidden content-between w-full">
                          <div className="flex-grow flex-shrink basis-auto">
                            <Typography
                              variant="body1"
                              className="text-lg pl-1"
                            >
                              <b>{spell.name}</b>
                            </Typography>
                            <Typography
                              variant="caption"
                              className="text-sm pl-1"
                            >
                              {spell.schoolName}
                            </Typography>
                            <div className="flex flex-row overflow-hidden flex-wrap">
                              {spell.spellTags?.map((t) => (
                                <Card
                                  key={`card-${sectionId}-${spell.id}-${t}`}
                                  variant="elevation"
                                  elevation={4}
                                  sx={{
                                    bgcolor:
                                      theme.palette.mode === "dark"
                                        ? theme.palette.background.default
                                        : theme.palette.grey[200],
                                    color:
                                      theme.palette.mode === "dark"
                                        ? theme.palette.secondary.light
                                        : theme.palette.primary.dark,
                                  }}
                                  className="mr-1 ml-1 mt-1 pl-1 pr-1 mb-1"
                                >
                                  <Typography
                                    variant="caption"
                                    className="text-xs"
                                  >
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
                                  <div className="flex-grow flex-shrink"></div>
                                  <div>
                                    {listName == "Arcane" ? (
                                      <AutoStories
                                        color="primary"
                                        fontSize="small"
                                      />
                                    ) : listName == "Divine" ? (
                                      <TempleHindu
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ) : (
                                      <Pets color="success" fontSize="small" />
                                    )}
                                  </div>
                                  <Typography
                                    variant="caption"
                                    className="text-xs flex-grow basis-auto"
                                    sx={{
                                      color:
                                        listName == "Arcane"
                                          ? theme.palette.primary.main
                                          : listName == "Divine"
                                          ? theme.palette.secondary.main
                                          : theme.palette.success.main,
                                    }}
                                  >
                                  </Typography>
                                </div>
                              </div>
                            ))}
                        </div>
                      </ListItemButton>
                      <Divider
                        sx={{
                          color:
                            theme.palette.mode == "dark"
                              ? theme.palette.primary.dark
                              : theme.palette.primary.light,
                          bgcolor:
                            theme.palette.mode == "dark"
                              ? theme.palette.primary.dark
                              : theme.palette.primary.light,
                        }}
                      />
                    </div>
                  ))}
              </ul>
            </li>
          ))}
          <img src="/dnd.png" className="mt-4 mb-4" />
        </List> */}
      </>
    );
  }
}
