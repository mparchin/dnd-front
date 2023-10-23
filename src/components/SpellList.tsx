import {
  Alert,
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
import useSWR from "swr";
import { getSpells } from "../api";
import { Spell } from "../models/spell";
import { AutoStories, Pets, TempleHindu } from "@mui/icons-material";
import { useSpellDetailStore } from "./SpellDetailDialog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpellListState {
  spells: Spell[];
  setSpells: (spells: Spell[]) => void;
}

interface SearchParamatersState {
  searchString?: string;
  setSearchString: (str?: string) => void;
}

export const useSearchParamatersStore = create<SearchParamatersState>(
  (set) => ({
    searchString: undefined,
    setSearchString: (str?: string) => set({ searchString: str }),
  })
);

export const useSpellListStore = create(
  persist<SpellListState>(
    (set) => ({
      spells: [],
      setSpells: (spells: Spell[]) => set({ spells: spells }),
    }),
    {
      name: "SpellList-Storage",
    }
  )
);

export default function SpellList() {
  const theme = useTheme();
  const openDetails = useSpellDetailStore((state) => state.open);
  const { searchString } = useSearchParamatersStore((state) => state);
  const { spells, setSpells } = useSpellListStore((state) => state);
  const { data, error, isLoading } = useSWR<Spell[], Error>(
    spells.length == 0 ? "/spells" : null,
    getSpells
  );

  if (spells.length == 0) {
    if (error)
      return (
        <Alert security="Error">{`Failed to load data !! ${error}`}</Alert>
      );

    if (isLoading)
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

    if (data) {
      setSpells(data);
    }
  }

  if (spells) {
    var query = spells;
    if (searchString)
      query = query.filter((spell) => spell.name.includes(searchString));
    const spellLevels = [...new Set(query.map((spell) => spell.level))].sort();
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          "& ul": { padding: 0 },
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
                        ? theme.palette.background.paper
                        : theme.palette.grey[400],
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
                .sort((a, b) => (a == b ? 0 : a > b ? 1 : -1))
                .map((spell) => (
                  <div
                    key={`item-${sectionId}-${spell.id}`}
                    onClick={() => openDetails(spell)}
                  >
                    <ListItemButton>
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
                        <div className="text-center flex-grow-0 basis-0">
                          <div className="flex flex-col w-full h-full">
                            <div className="flex-grow flex-shrink"></div>
                            <div>
                              {spell.spellListName == "Arcane" ? (
                                <AutoStories color="primary" />
                              ) : spell.spellListName == "Divine" ? (
                                <TempleHindu color="secondary" />
                              ) : (
                                <Pets color="success" />
                              )}
                            </div>
                            <Typography
                              variant="caption"
                              className="text-xs flex-grow basis-auto"
                              sx={{
                                color:
                                  spell.spellListName == "Arcane"
                                    ? theme.palette.primary.main
                                    : spell.spellListName == "Divine"
                                    ? theme.palette.secondary.main
                                    : theme.palette.success.main,
                              }}
                            >
                              {spell.spellListName}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      {/* <ListItemText primary={`${spell.name}`} /> */}
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
            </ul>
          </li>
        ))}
      </List>
    );
  }
}
