import {
  Card,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { AutoStories, Pets, TempleHindu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FilterData, useSpellListStore } from "../api";
import { useFilterStore } from "./FilterDialog";
import { useMemo } from "react";

export default function SpellList() {
  const theme = useTheme();
  const spells = useSpellListStore((state) => state.spells);
  const navigate = useNavigate();
  const filter = useFilterStore((state) => state);
  const query = useMemo(() => {
    return FilterData(spells, filter);
  }, [spells, filter]);

  if (spells.length == 0)
    return (
      <>
        <CircularProgress
          size={80}
          className="absolute z-20 left-[calc(50%-40px)] top-[calc(50%-40px)]"
        />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            "& ul": { padding: 0 },
          }}
          className="overflow-auto box-border z-10"
          subheader={<li />}
        >
          {[0, 1, 2].map((sectionId) => (
            <li key={`skeleton-${sectionId}`}>
              <ul>
                <ListSubheader>
                  <Skeleton variant="text"></Skeleton>
                </ListSubheader>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <div key={`item-${sectionId}-${item}`}>
                    <ListItem>
                      {/* <ListItemText primary={`Item ${item}`} /> */}
                      <Skeleton
                        variant="rectangular"
                        className="flex-grow h-20"
                      ></Skeleton>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </>
    );

  if (query) {
    const spellLevels = [...new Set(query.map((spell) => spell.level))].sort();
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          "& ul": { padding: 0 },
        }}
        style={{
          backgroundColor:
            theme.palette.mode === "dark"
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
                      navigate("details", { state: { spell: spell } });
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
                          <Typography variant="body1" className="text-lg">
                            <b>{spell.name}</b>
                          </Typography>
                          <Typography variant="caption" className="text-sm">
                            {spell.schoolName}
                          </Typography>
                          <div className="flex flex-row overflow-hidden flex-wrap">
                            {spell.spellTags?.map((t) => (
                              <Card
                                key={`card-${sectionId}-${spell.id}-${t}`}
                                variant="elevation"
                                sx={{
                                  bgcolor:
                                    theme.palette.mode === "dark"
                                      ? theme.palette.background.default
                                      : theme.palette.grey[200],
                                  color:
                                    theme.palette.mode === "dark"
                                      ? theme.palette.secondary.dark
                                      : theme.palette.primary.dark,
                                }}
                                className="mr-2 mt-2 pl-1 pr-1"
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
                                  {/* {listName[0]} */}
                                </Typography>
                              </div>
                            </div>
                          ))}
                      </div>
                      {/* <ListItemText primary={`${spell.name}`} /> */}
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
      </List>
    );
  }
}
