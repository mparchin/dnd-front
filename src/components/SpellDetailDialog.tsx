import { Spell } from "../models/spell";
import {
  Card,
  CircularProgress,
  Fab,
  IconButton,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Add,
  ArrowBackIosNew,
  AutoStories,
  Pets,
  TempleHindu,
} from "@mui/icons-material";
import { SpellArgs } from "./SpellArgs";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { memo, useEffect, useMemo } from "react";
import { Dndsvg } from "../assets/dndsvg";
import {
  useBgColor,
  usePrimaryColor,
  usePrimaryColorString,
  useThemeStore,
} from "../theme";
import { useCharacterAPI, useCharacterListStore } from "../API/characters";
import { BottomDialog } from "./Controls/BottomDialog";
import { CharacterListItem } from "./CharactersList";
import { CharacterSpell } from "../models/Character/CharacterSpell";

interface SpellDetailState {
  spell?: Spell;
  isOpen: boolean;
  isLoading: boolean;
  bottomIsOpen: boolean;
  open: (spell?: Spell) => void;
  close: (spell?: Spell) => void;
  setIsLoading: (flag: boolean) => void;
  setBottomIsOpen: (flag: boolean) => void;
}

const useSpellDetailStore = create<SpellDetailState>()((set) => ({
  spell: undefined,
  isOpen: false,
  isLoading: false,
  bottomIsOpen: false,
  open: (spell) => set({ spell: spell, isOpen: true }),
  close: (spell) => set({ spell: spell, isOpen: false }),
  setIsLoading: (flag) => set({ isLoading: flag }),
  setBottomIsOpen: (flag) => set({ bottomIsOpen: flag }),
}));

export const SpellDetailDialog = memo(() => {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();
  const bgColor = useBgColor();
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () =>
    location.pathname == "/details" || location.pathname == "/charSpellDetails";
  const CloseRequest = () => {
    if (IsOpenRequest() && location.pathname == "/details") navigate(-1);
    else if (IsOpenRequest() && location.pathname == "/charSpellDetails")
      navigate("/characterView", {
        state: { charId: location.state.charId },
        replace: true,
      });
  };
  const state = useSpellDetailStore((state) => state);
  useEffect(() => {
    if (!state.isOpen && IsOpenRequest()) state.open(location.state.spell);
    else if (state.isOpen && !IsOpenRequest()) state.close(state.spell);
  }, [state.isOpen, IsOpenRequest, state.spell]);

  const characterAPI = useCharacterAPI();
  const characters = useCharacterListStore((state) => state.characters);
  const drawerSx = useMemo(
    () => ({
      "& .MuiDrawer-paper": {
        width: "100%",
        bgcolor: bgColor,
      },
    }),
    [bgColor]
  );

  const dividerStyle = useMemo(() => ({ backgroundColor: primaryColor.main }), [
    primaryColor,
  ]);
  const iconStyle = useMemo(
    () => ({ color: theme.palette.background.default }),
    [theme.palette.mode]
  );

  const cardSx = useMemo(
    () => ({
      bgcolor:
        theme.palette.mode === "dark"
          ? theme.palette.background.default
          : theme.palette.grey[200],
      color:
        theme.palette.mode === "dark" ? primaryColor.light : primaryColor.dark,
    }),
    [theme.palette.mode]
  );

  const descriptionInnerHtml = useMemo(
    () => ({
      __html:
        state.spell?.description
          .replace(/color:hsl\(0, 0%, 0%\);/g, "")
          .replace(/color:hsl\(0,0%,0%\);/g, "") ?? "",
    }),
    [state.spell?.description]
  );

  const higherDescriptionInnerHtml = useMemo(
    () => ({
      __html: (state.spell?.higherLevelDescription ?? "")
        .replace(/color:hsl\(0, 0%, 0%\);/g, "")
        .replace(/color:hsl\(0,0%,0%\);/g, ""),
    }),
    [state.spell?.higherLevelDescription]
  );

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={state.isOpen}
      transitionDuration={200}
      disableDiscovery={true}
      onClose={() => CloseRequest()}
      onOpen={() => state.open(state.spell)}
      elevation={0}
      sx={drawerSx}
    >
      <div className="flex w-full h-full overflow-x-hidden overflow-y-hidden flex-col">
        <div className="flex w-full overflow-hidden flex-shrink-0 flex-row h-16">
          <div className="flex-grow basis-0 pt-2 ">
            <IconButton onClick={() => CloseRequest()}>
              <ArrowBackIosNew color={primaryColorString} />
            </IconButton>
          </div>
          <div className="grow-[3] basis-0 pt-4 text-center">
            <Typography color={primaryColorString}>
              {state.spell?.name}
            </Typography>
          </div>
          <div className="flex-grow basis-0 pt-4 pr-1 text-right">
            {state.spell?.spellListName
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
            {state.spell?.name}
          </Typography>
          <div className="pl-2 pt-2 pr-2">
            <SpellArgs
              name="List"
              value={state.spell?.spellListName.replace(/,/g, ", ")}
            />
            <SpellArgs name="Book" value={state.spell?.book} />
            <SpellArgs
              name="Level"
              value={`${
                state.spell?.level == 0 ? "Cantrip" : state.spell?.level
              }`}
            />
            <SpellArgs name="School" value={state.spell?.schoolName} />
            <SpellArgs
              name="Ritual"
              value={state.spell?.isRitual ? "Yes" : undefined}
            />
            <SpellArgs
              name="Casting time"
              value={
                state.spell?.action === "Longer"
                  ? state.spell?.longerAction
                  : state.spell?.action == "BonusAction"
                  ? "Bonus Action"
                  : state.spell?.action
              }
            />
            <SpellArgs
              name="Concentration"
              value={state.spell?.isConcentration ? "Yes" : undefined}
            />
            <SpellArgs name="Range" value={state.spell?.range} />
            <SpellArgs
              name="Components"
              value={
                state.spell?.hasVerbalComponent &&
                state.spell?.hasSomaticComponent &&
                state.spell?.hasMaterialComponent
                  ? `V, S, M (${state.spell?.materials})`
                  : state.spell?.hasVerbalComponent &&
                    state.spell?.hasSomaticComponent
                  ? "V, S"
                  : state.spell?.hasVerbalComponent &&
                    state.spell?.hasMaterialComponent
                  ? `V, M (${state.spell?.materials})`
                  : state.spell?.hasSomaticComponent &&
                    state.spell?.hasMaterialComponent
                  ? `S, M (${state.spell?.materials})`
                  : state.spell?.hasVerbalComponent
                  ? "V"
                  : state.spell?.hasSomaticComponent
                  ? "S"
                  : state.spell?.hasMaterialComponent
                  ? `M (${state.spell?.materials})`
                  : ""
              }
            />
            <SpellArgs name="Duration" value={state.spell?.duration} />
            <SpellArgs
              name="Restricted to"
              value={state.spell?.restrictedClasses?.join(", ")}
            />
            <div className="flex flex-row overflow-hidden flex-wrap">
              {state.spell?.spellTags?.map((t) => (
                <Card
                  key={`card-${state.spell?.id}-${t}`}
                  variant="elevation"
                  elevation={4}
                  sx={cardSx}
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
                dangerouslySetInnerHTML={descriptionInnerHtml}
              ></div>
              {state.spell?.higherLevelDescription ? (
                <div className="pt-4">
                  <strong style={{ color: primaryColor.main }}>
                    At Higher Levels:{" "}
                  </strong>
                  <div
                    dangerouslySetInnerHTML={higherDescriptionInnerHtml}
                  ></div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {(state.spell?.relatedConditions?.length ?? 0) > 0 ? (
            <div className="pt-3">
              <Typography variant="h6" color={primaryColor.main}>
                Conditions
              </Typography>
              {state.spell?.relatedConditions?.map((condition) => {
                const html = {
                  __html: condition.description
                    .replace(/color:hsl\(0, 0%, 0%\);/g, "")
                    .replace(/color:hsl\(0,0%,0%\);/g, ""),
                };
                return (
                  <div key={condition.name} className="pt-2 pl-2 pr-2">
                    <strong className="text-lg">{condition.name}</strong>
                    <div
                      className={`pl-2 pr-2 conditions ${theme.palette.mode} ${
                        themeStore.isPrimarySwapped ? "swappedColors" : ""
                      }`}
                      dangerouslySetInnerHTML={html}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <Dndsvg background={bgColor} color={primaryColor.main} />
        </div>
      </div>
      <Fab
        className="fixed bottom-8 right-8"
        onClick={() => {
          if (characters.length == 0)
            characterAPI
              .getAll(state.setIsLoading)
              .then(() => state.setBottomIsOpen(true));
          else state.setBottomIsOpen(true);
        }}
        style={dividerStyle}
      >
        {state.isLoading ? (
          <CircularProgress style={iconStyle} />
        ) : (
          <Add style={iconStyle} />
        )}
      </Fab>
      <BottomDialog
        isOpen={state.bottomIsOpen}
        disableAppbar
        disableLogo
        onClose={() => state.setBottomIsOpen(false)}
      >
        {characters.length != 0 ? (
          characters.map((char) => {
            return (
              <CharacterListItem
                key={char.id}
                character={char}
                hideIcons
                onClick={(id) => {
                  if (
                    state.spell &&
                    characters
                      .find((c) => c.id == id)
                      ?.spells?.find((s) => s.spellId == state.spell?.id) ==
                      undefined
                  )
                    characterAPI.createSpell(
                      id,
                      new CharacterSpell(0, state.spell.id),
                      state.setIsLoading
                    );
                  state.setBottomIsOpen(false);
                }}
              />
            );
          })
        ) : (
          <div className="h-28 flex flex-col p-2">
            <div className="grow"></div>
            Please first make a character in characters page
            <div className="grow"></div>
          </div>
        )}
      </BottomDialog>
    </SwipeableDrawer>
  );
});
