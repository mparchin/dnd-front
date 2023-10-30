import { Spell } from "../models/spell";
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
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";

interface SpellDetailState {
  spell?: Spell;
  isOpen: boolean;
  open: (spell?: Spell) => void;
  close: () => void;
}

const useSpellDetailStore = create<SpellDetailState>((set) => ({
  spell: undefined,
  isOpen: false,
  open: (spell) => set({ spell: spell, isOpen: true }),
  close: () => set({ spell: undefined, isOpen: false }),
}));

export default function SpellDetailDialog() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () => location.pathname.includes("details");
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  const { isOpen, spell, open, close } = useSpellDetailStore((state) => state);
  if (!isOpen && IsOpenRequest()) open(location.state.spell);
  else if (isOpen && !IsOpenRequest()) close();
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      transitionDuration={300}
      onClose={() => CloseRequest()}
      onOpen={() => open(spell)}
      elevation={0}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          bgcolor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        },
      }}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-auto flex-col pb-4">
        <div className="flex w-full overflow-hidden flex-shrink-0 flex-row">
          <div className="flex-grow basis-0 pt-2 pl-2">
            <IconButton onClick={() => CloseRequest()}>
              <ArrowBackIosNew color="primary" />
            </IconButton>
          </div>
          <div
            className="grow-[3] basis-0 pt-4 text-center"
            style={{
              color:
                theme.palette.mode == "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
            }}
          >
            {spell?.name}
          </div>
          <div className="flex-grow basis-0 pt-4 pr-4 text-right">
            {spell?.spellListName
              .split(",")
              .sort()
              .map((listName) => (
                <span key={listName}>
                  {listName == "Arcane" ? (
                    <AutoStories color="primary" fontSize="small" />
                  ) : listName == "Divine" ? (
                    <TempleHindu color="secondary" fontSize="small" />
                  ) : (
                    <Pets color="success" fontSize="small" />
                  )}
                </span>
              ))}
          </div>
        </div>
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-5">
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
            <SpellArgs
              name="List"
              value={spell?.spellListName.replace(",", ", ")}
            />
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
            <SpellArgs
              name="Concentration"
              value={spell?.isConcentration ? "YES" : undefined}
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
              name="Restricted to"
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
              <div
                className="pr-5 pt-4"
                dangerouslySetInnerHTML={{ __html: spell?.description ?? "" }}
              ></div>
              {spell?.higherLevelDescription ? (
                <div className="pr-5 pt-4">
                  <strong>At Higher Levels: </strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: spell?.higherLevelDescription,
                    }}
                  ></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {(spell?.relatedConditions?.length ?? 0) > 0 ? (
            <div className="pt-3 pr-5">
              <Typography
                variant="h6"
                color={
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main
                }
              >
                Conditions
              </Typography>
              {spell?.relatedConditions?.map((condition) => (
                <div key={condition.name} className="pt-2 pl-2">
                  <strong className="text-lg">{condition.name}</strong>
                  <div
                    className="pl-2"
                    dangerouslySetInnerHTML={{ __html: condition.description }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
