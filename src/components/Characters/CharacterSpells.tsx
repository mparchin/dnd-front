import { Button, Card, CircularProgress } from "@mui/material";
import { Circle } from "../../assets/circle";
import { memo, useMemo } from "react";
import { usePrimaryColor, usePrimaryColorString } from "../../theme";
import { Spell } from "../../models/spell";
import { useSpellListStore } from "../../API/spell";
import { useCharacterAPI } from "../../API/characters";
import { create } from "zustand";
import {
  CalculateAttribute,
  CalculateCurrentMana,
  CalculateModifire,
  CalculateSpellAttack,
  CalculateSpellSaveDC,
} from "../../models/extraCalculations";
import { Character } from "../../models/Character/Character";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BottomDialog } from "../Controls/BottomDialog";

interface CharacterSpellProps {
  onManageClick: () => void;
  isManageMode: boolean;
  character: Character;
}

interface CharacterSpellsState {
  deleteLoadingId: number;
  setDeleteLoadingId: (id: number) => void;
  prepareLoadingId: number;
  setPrepareLoadingId: (id: number) => void;
  castLoadingId: number;
  setCastLoadingId: (id: number) => void;
  dialogIsOpen: boolean;
  setDialogIsOpen: (flag: boolean) => void;
  baseCastSpellLevel: number;
  setBaseCastSpellLevel: (level: number) => void;
}

const useCharacterSpellStore = create<CharacterSpellsState>()((set) => ({
  deleteLoadingId: 0,
  setDeleteLoadingId: (id) => set({ deleteLoadingId: id }),
  prepareLoadingId: 0,
  setPrepareLoadingId: (id) => set({ prepareLoadingId: id }),
  castLoadingId: 0,
  setCastLoadingId: (id) => set({ castLoadingId: id }),
  dialogIsOpen: false,
  setDialogIsOpen: (flag) => set({ dialogIsOpen: flag }),
  baseCastSpellLevel: 0,
  setBaseCastSpellLevel: (level) => set({ baseCastSpellLevel: level }),
}));

export const CharacterSpells = memo((props: CharacterSpellProps) => {
  const navigate = useNavigate();
  const spellList = useSpellListStore((state) => state.spells);
  const primaryColorString = usePrimaryColorString();
  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const state = useCharacterSpellStore((state) => state);
  const characterAPI = useCharacterAPI();
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: primaryColor.main,
      color: "white",
    }),
    [primaryColor]
  );
  const spells = useMemo(
    () =>
      props.character.spells
        .map((s) => ({
          spell:
            spellList.find((spell) => spell.id == s.spellId) ?? new Spell(),
          charSpell: s,
        }))
        .filter((s) => s.spell.id != 0)
        .sort((a, b) => (a.spell.name > b.spell.name ? 1 : -1)),
    [props.character, props.character.spells, spellList]
  );
  const spellLevels = useMemo(
    () => [...new Set(spells.map((spell) => spell.spell.level))].sort(),
    [spells]
  );
  const attributeModifire = useMemo(
    () =>
      CalculateModifire(
        CalculateAttribute(
          props.character.spellCasting.castingAbility,
          props.character.attributes
        )
      ),
    [props.character]
  );
  const currentMana = useMemo(() => CalculateCurrentMana(props.character), [
    props.character,
  ]);

  return (
    <>
      <div className="w-full flex flex-row justify-center mb-5">
        <div className="flex flex-col text-center w-20 mr-3">
          <div className="grow">
            <span className="text-2xl font-bold">
              <span style={coloredStyle}>
                {spells.filter((s) => s.charSpell.isPrepared).length}
              </span>
            </span>
          </div>
          <div className="text-xxs uppercase">prepared</div>
        </div>
        <div className="flex flex-col text-center w-20 mr-3">
          <div className="grow">
            <span className="text-2xl font-bold">
              <span style={coloredStyle}>
                {attributeModifire >= 0
                  ? `+${attributeModifire}`
                  : attributeModifire}
              </span>
            </span>
          </div>
          <div className="text-xxs uppercase">modifire</div>
        </div>
        <div className="flex flex-col text-center w-20 mr-3">
          <div className="grow">
            <span className="text-2xl font-bold">
              <span style={coloredStyle}>
                {CalculateSpellAttack(props.character)}
              </span>
            </span>
          </div>
          <div className="text-xxs uppercase">Spell attack</div>
        </div>
        <div className="flex flex-col text-center w-20">
          <div className="grow">
            <span className="text-2xl font-bold" style={coloredStyle}>
              {CalculateSpellSaveDC(props.character)}
            </span>
          </div>
          <div className="text-xxs uppercase">save DC</div>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="grow"></div>
        <Button
          variant="outlined"
          color={primaryColorString}
          className={props.isManageMode ? "p-2" : "p-2 mb-10"}
          style={props.isManageMode ? buttonStyle : undefined}
          onClick={props.onManageClick}
        >
          Manage spells
        </Button>
        <div className="grow"></div>
      </div>

      {props.isManageMode ? (
        <div
          className={props.isManageMode ? "m-2 text-xs mb-10" : "m-2 text-xs"}
        >
          You can add more spells from spell page
        </div>
      ) : (
        <></>
      )}

      {spellLevels.map((level) => (
        <div
          key={level}
          className="w-96 flex flex-row mb-10 mr-4 ml-4 last:mb-2 md:last:mb-10"
        >
          <Card className="p-2 pt-4 pb-4" elevation={3}>
            <div className="flex flex-col">
              {(level == 6 && props.character.spellCasting.used6thLevel) ||
              (level == 7 && props.character.spellCasting.used7thLevel) ||
              (level == 8 && props.character.spellCasting.used8thLevel) ||
              (level == 9 && props.character.spellCasting.used9thLevel) ? (
                <Circle
                  className="w-4 ml-0.5 mb-2 mt-0.5 shrink-0"
                  filled={true}
                  text="U"
                />
              ) : (
                <></>
              )}
              <div className="uppercase text-vertical-lr text-sm text-center pr-1.5">
                {level == 0 ? "cantrips" : `level ${level}`}
              </div>
            </div>
          </Card>
          <div className="grow flex flex-col w-full pr-4">
            {spells
              .filter((spell) => spell.spell.level == level)
              .map((spell) => (
                <div
                  key={spell.spell.id}
                  className="w-72 flex flex-row ml-2 pb-2 pt-2 border-b-2 rounded-md"
                  onClick={() =>
                    navigate("charSpellDetails", {
                      state: { charId: props.character.id, spell: spell.spell },
                      replace: true,
                    })
                  }
                >
                  {!props.isManageMode && spell.spell.level > 0 ? (
                    <div className="flex flex-col">
                      <Circle
                        className="w-4 mb-0.5 mt-0.5 shrink-0"
                        filled={spell.charSpell.isPrepared}
                        text="P"
                      />
                      <Circle
                        className="w-4 mb-0.5 mt-0.5 shrink-0"
                        filled={spell.spell.isConcentration}
                        text="C"
                      />
                      <Circle
                        className="w-4 mb-0.5 mt-0.5 shrink-0"
                        filled={spell.spell.isRitual}
                        text="R"
                      />
                    </div>
                  ) : props.isManageMode && spell.spell.level > 0 ? (
                    <div className="flex flex-col basis-0">
                      <div className="grow"></div>
                      <Button
                        variant="outlined"
                        className=""
                        color={primaryColorString}
                        style={
                          spell.charSpell.isPrepared ? buttonStyle : undefined
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          var entity = structuredClone(spell.charSpell);
                          entity.isPrepared = !spell.charSpell.isPrepared;
                          characterAPI.updateSpell(
                            props.character.id,
                            entity,
                            (flag) =>
                              state.setPrepareLoadingId(
                                flag ? spell.spell.id : 0
                              )
                          );
                        }}
                      >
                        {state.prepareLoadingId == spell.spell.id ? (
                          <CircularProgress
                            size="1.5rem"
                            color={primaryColorString}
                            style={
                              spell.charSpell.isPrepared
                                ? buttonStyle
                                : undefined
                            }
                          />
                        ) : (
                          "P"
                        )}
                      </Button>
                      <div className="grow"></div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="ml-2 mr-2 basis-0 grow flex flex-row flex-wrap">
                    <div className="capitalize grow flex flex-col">
                      <span className="grow"></span>
                      <span
                        className={`capitalize ${
                          spell.spell.name.match(/\b[^ \t\n\.]{15,}\b/i)
                            ? "break-all"
                            : "break-words"
                        }`}
                      >
                        {spell.spell.name}
                      </span>
                      <span className="grow"></span>
                    </div>
                    {props.isManageMode ? (
                      <></>
                    ) : (
                      <div className="flex flex-col">
                        <span className="grow"></span>
                        <span className="capitalize text-xxs">
                          {spell.spell.action == "Longer"
                            ? spell.spell.longerAction
                            : spell.spell.action == "BonusAction"
                            ? "Bonus Action"
                            : spell.spell.action}
                        </span>
                        <span className="grow"></span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col basis-0">
                    <div className="grow"></div>
                    {props.isManageMode ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          characterAPI.deleteSpell(
                            props.character.id,
                            spell.charSpell.id,
                            (flag) =>
                              state.setDeleteLoadingId(
                                flag ? spell.spell.id : 0
                              )
                          );
                        }}
                      >
                        {state.deleteLoadingId == spell.spell.id ? (
                          <CircularProgress size="1.5rem" color="error" />
                        ) : (
                          <Delete />
                        )}
                      </Button>
                    ) : spell.spell.level > 0 ? (
                      <Button
                        variant="outlined"
                        color={primaryColorString}
                        disabled={
                          !spell.charSpell.isPrepared
                            ? true
                            : currentMana < spell.spell.level
                            ? true
                            : spell.spell.level == 6 &&
                              props.character.spellCasting.used6thLevel &&
                              props.character.spellCasting.used7thLevel &&
                              props.character.spellCasting.used8thLevel &&
                              props.character.spellCasting.used9thLevel
                            ? true
                            : spell.spell.level == 7 &&
                              props.character.spellCasting.used7thLevel &&
                              props.character.spellCasting.used8thLevel &&
                              props.character.spellCasting.used9thLevel
                            ? true
                            : spell.spell.level == 8 &&
                              props.character.spellCasting.used8thLevel &&
                              props.character.spellCasting.used9thLevel
                            ? true
                            : spell.spell.level == 9 &&
                              props.character.spellCasting.used9thLevel
                            ? true
                            : false
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          state.setBaseCastSpellLevel(spell.spell.level);
                          state.setDialogIsOpen(true);
                          state.setCastLoadingId(spell.spell.id);
                        }}
                      >
                        {state.castLoadingId == spell.spell.id ? (
                          <CircularProgress
                            size="1.5rem"
                            color={primaryColorString}
                          />
                        ) : (
                          "Cast"
                        )}
                      </Button>
                    ) : (
                      <></>
                    )}

                    <div className="grow"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <BottomDialog
        isOpen={state.dialogIsOpen}
        disableAppbar
        onClose={() => {
          state.setDialogIsOpen(false);
          state.setCastLoadingId(0);
        }}
        disableLogo
      >
        <div className="flex flex-row">
          <div className="grow"></div>
          <div className="flex flex-col">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
              if (
                level >= state.baseCastSpellLevel &&
                level <= currentMana &&
                (level <= 5 ||
                  (level == 6 && !props.character.spellCasting.used6thLevel) ||
                  (level == 7 && !props.character.spellCasting.used7thLevel) ||
                  (level == 8 && !props.character.spellCasting.used8thLevel) ||
                  (level == 9 && !props.character.spellCasting.used9thLevel))
              )
                return (
                  <Button
                    key={level}
                    className="w-88 mb-2 p-4"
                    variant="outlined"
                    color={primaryColorString}
                    onClick={() => {
                      state.setDialogIsOpen(false);
                      props.character.spellCasting.usedMana += level;
                      if (level == 6)
                        props.character.spellCasting.used6thLevel = true;
                      if (level == 7)
                        props.character.spellCasting.used7thLevel = true;
                      if (level == 8)
                        props.character.spellCasting.used8thLevel = true;
                      if (level == 9)
                        props.character.spellCasting.used9thLevel = true;
                      characterAPI.update(props.character, (flag) => {
                        if (!flag) state.setCastLoadingId(0);
                      });
                    }}
                  >{`AT LEVEL ${level}`}</Button>
                );
              return <></>;
            })}
          </div>
          <div className="grow"></div>
        </div>
      </BottomDialog>
    </>
  );
});
