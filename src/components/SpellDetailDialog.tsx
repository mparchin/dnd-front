import { Spell } from "../models/spell";
import { create } from "zustand";
import {
  Card,
  IconButton,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIosNew,
  AutoStories,
  Pets,
  TempleHindu,
} from "@mui/icons-material";
import SpellArgs from "./SpellArgs";

interface SpellDetailState {
  isOpen: boolean;
  spell: Spell | null;
  open: (spell?: Spell) => void;
  close: () => void;
}

export const useSpellDetailStore = create<SpellDetailState>((set) => ({
  isOpen: false,
  spell: null,
  open: (spell?: Spell) =>
    spell ? set({ isOpen: true, spell: spell }) : set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default function SpellDetailDialog() {
  const theme = useTheme();
  const { isOpen, close, spell, open } = useSpellDetailStore((state) => state);
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      onClose={() => close()}
      onOpen={() => open()}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
        },
      }}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full h-20 overflow-hidden flex-row">
          <div className="flex-grow flex-shrink basis-0 pt-3 pl-2">
            <IconButton onClick={() => close()}>
              <ArrowBackIosNew color="primary" />
            </IconButton>
          </div>
          <div
            className="flex-grow flex-shrink basis-0 pt-4 text-center"
            style={{
              color:
                theme.palette.mode == "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
            }}
          >
            {spell?.name}
          </div>
          <div className="flex-grow flex-shrink basis-0 pt-4 pr-4 text-right">
            {spell?.spellListName == "Arcane" ? (
              <AutoStories color="primary" />
            ) : spell?.spellListName == "Divine" ? (
              <TempleHindu color="secondary" />
            ) : (
              <Pets color="success" />
            )}
          </div>
        </div>
        <div className="w-full overflow-x-hidden overflow-y-auto pl-5">
          <Typography
            variant="h4"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            }
          >
            {spell?.name}
          </Typography>
          <div className="pl-2 pt-2">
            <SpellArgs name="List" value={spell?.spellListName} />
            <SpellArgs name="Book" value={spell?.book} />
            <SpellArgs name="Level" value={spell?.level.toString()} />
            <SpellArgs name="School" value={spell?.schoolName} />
            <SpellArgs
              name="Ritual"
              value={spell?.isRitual ? "YES" : undefined}
            />
            <SpellArgs
              name="Casting time"
              value={
                spell?.action === "Longer" ? spell?.longerAction : spell?.action
              }
            />
            <SpellArgs name="Range" value={spell?.range} />
            <SpellArgs
              name="Components"
              value={
                spell?.hasVerbalComponent &&
                spell?.hasSomaticComponent &&
                spell?.hasMaterialComponent
                  ? `V, S, M (${spell?.materials})`
                  : spell?.hasVerbalComponent && spell?.hasSomaticComponent
                  ? "V, S"
                  : spell?.hasVerbalComponent && spell?.hasMaterialComponent
                  ? `V, M (${spell?.materials})`
                  : spell?.hasSomaticComponent && spell?.hasMaterialComponent
                  ? `S, M (${spell?.materials})`
                  : spell?.hasVerbalComponent
                  ? "V"
                  : spell?.hasSomaticComponent
                  ? "S"
                  : spell?.hasMaterialComponent
                  ? `M (${spell?.materials})`
                  : ""
              }
            />
            <SpellArgs name="Duration" value={spell?.duration} />
            <SpellArgs
              name="Classes"
              value={spell?.restrictedClasses?.join(", ")}
            />
            <div className="flex flex-row overflow-hidden flex-wrap">
              {spell?.spellTags?.map((t) => (
                <Card
                  key={`card-${spell.id}-${t}`}
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
                  <Typography variant="caption" className="text-xs">
                    {t.toUpperCase()}
                  </Typography>
                </Card>
              ))}
              <div className="pr-4 pt-4">{spell?.description}</div>
              {spell?.higherLevelDescription != undefined ? (
                <div className="pr-4 pt-4">
                  <strong>At Higher Levels. </strong>
                  {spell?.higherLevelDescription}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
