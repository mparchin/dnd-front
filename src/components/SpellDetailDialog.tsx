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
import { useEffect, useMemo } from "react";
import Dndsvg from "../assets/dndsvg";
import { getPrimaryColor, useThemeStore } from "../theme";

interface SpellDetailState {
  spell?: Spell;
  isOpen: boolean;
  open: (spell?: Spell) => void;
  close: (spell?: Spell) => void;
}

const useSpellDetailStore = create<SpellDetailState>()((set) => ({
  spell: undefined,
  isOpen: false,
  open: (spell) => set({ spell: spell, isOpen: true }),
  close: (spell) => set({ spell: spell, isOpen: false }),
}));

export default function SpellDetailDialog() {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () => location.pathname.includes("details");
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  const { isOpen, spell, open, close } = useSpellDetailStore((state) => state);
  useEffect(() => {
    if (!isOpen && IsOpenRequest()) open(location.state.spell);
    else if (isOpen && !IsOpenRequest()) close(spell);
  }, [isOpen, IsOpenRequest, spell]);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={isOpen}
      transitionDuration={200}
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
      <div className="flex w-full h-full overflow-x-hidden overflow-y-hidden flex-col">
        <div className="flex w-full overflow-hidden flex-shrink-0 flex-row h-16">
          <div className="flex-grow basis-0 pt-2 ">
            <IconButton onClick={() => CloseRequest()}>
              <ArrowBackIosNew sx={{ color: primaryColor.main }} />
            </IconButton>
          </div>
          <div
            className="grow-[3] basis-0 pt-4 text-center"
            style={{
              color: primaryColor.main,
            }}
          >
            {spell?.name}
          </div>
          <div className="flex-grow basis-0 pt-4 pr-1 text-right">
            {spell?.spellListName
              .split(",")
              .sort()
              .map((listName) => (
                <span key={listName} className="pr-1">
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
        <div className="w-full overflow-x-hidden overflow-y-auto flex-grow pl-3 pr-3">
          <Typography variant="h4" color={primaryColor.main}>
            {spell?.name}
          </Typography>
          <div className="pl-2 pt-2 pr-2">
            <SpellArgs
              name="List"
              value={spell?.spellListName.replace(/,/g, ", ")}
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
                spell?.action === "Longer"
                  ? spell?.longerAction
                  : spell?.action == "BonusAction"
                  ? "Bonus Action"
                  : spell?.action
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
                  className="mr-1 ml-1 mt-2 pl-1 pr-1 mb-1"
                >
                  <Typography variant="caption" className="text-xs">
                    {t.toUpperCase()}
                  </Typography>
                </Card>
              ))}
              <div
                className={`pt-4 descriptions ${theme.palette.mode} ${
                  themeStore.isPrimarySwapped ? "swappedColors" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    spell?.description
                      .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                      .replace(/color:hsl\(0,0%,0%\);/g, "") ?? "",
                }}
              ></div>
              {spell?.higherLevelDescription ? (
                <div className="pt-4">
                  <strong style={{ color: primaryColor.main }}>
                    At Higher Levels:{" "}
                  </strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: spell?.higherLevelDescription
                        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                        .replace(/color:hsl\(0,0%,0%\);/g, ""),
                    }}
                  ></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {(spell?.relatedConditions?.length ?? 0) > 0 ? (
            <div className="pt-3">
              <Typography variant="h6" color={primaryColor.main}>
                Conditions
              </Typography>
              {spell?.relatedConditions?.map((condition) => (
                <div key={condition.name} className="pt-2 pl-2 pr-2">
                  <strong className="text-lg">{condition.name}</strong>
                  <div
                    className={`pl-2 pr-2 conditions ${theme.palette.mode} ${
                      themeStore.isPrimarySwapped ? "swappedColors" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: condition.description
                        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                        .replace(/color:hsl\(0,0%,0%\);/g, ""),
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          <Dndsvg
            background={
              theme.palette.mode == "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.default
            }
            color={primaryColor.main}
          />
        </div>
      </div>
    </SwipeableDrawer>
  );
}
