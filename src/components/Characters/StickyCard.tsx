import {
  Card,
  IconButton,
  Avatar,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { memo, useMemo } from "react";
import { Bonfire } from "../../assets/bonfire";
import { useBgColor, usePrimaryColor } from "../../theme";
import { Circle } from "../../assets/circle";
import { HPDialog, useHPDialogStore } from "./Edit/HPDialog";
import { useCharacterAPI } from "../../API/characters";
import { Character } from "../../models/Character/Character";
import {
  CalculateAC,
  CalculateBloodiedThreshold,
  CalculateCurrentHP,
  CalculateCurrentMana,
  CalculateCurrentMaximumHP,
  CalculateExpertTotalValue,
  CalculateMaximumMana,
  CalculateProficiencyBonous,
} from "../../models/extraCalculations";
import { ManaDialog, useManaDialogStore } from "./Edit/ManaDialog";

interface Props {
  character: Character;
}

export const StickyCard = memo((p: Props) => {
  const { update } = useCharacterAPI();
  const hpDialogState = useHPDialogStore((state) => state);
  const manaDialogState = useManaDialogStore((state) => state);
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const bgColor = useBgColor();
  const avatarStyle = useMemo(
    () => ({ color: primaryColor.main, backgroundColor: bgColor }),
    [primaryColor]
  );
  const currentHP = CalculateCurrentHP(p.character);
  const currentMaximumHP = CalculateCurrentMaximumHP(p.character);
  const bloodiedThreshHold = CalculateBloodiedThreshold(p.character);
  const HpColor = useMemo(
    () => ({
      backgroundColor:
        currentHP > bloodiedThreshHold
          ? theme.palette.success.main
          : theme.palette.error.main,
      color: theme.palette.common.white,
    }),
    [theme.palette.success, theme.palette.error, currentHP, currentMaximumHP]
  );
  const ManaColor = useMemo(
    () => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }),
    [theme.palette.primary]
  );
  const whiteColor = useMemo(
    () => ({
      color: theme.palette.common.white,
    }),
    [theme.palette.common.white]
  );
  return (
    <>
      <Card className="w-full p-2" elevation={3}>
        <div className="w-full h-40 flex flex-col">
          <div className="grow-[3] flex flex-row basis-0">
            <div className="grow flex flex-col justify-around basis-0">
              <IconButton
                className="flex flex-col h-12 text-base"
                color="default"
              >
                Conditions
              </IconButton>
              <IconButton className="flex flex-col h-12" color="default">
                <Bonfire />
              </IconButton>
            </div>
            <div className="pr-2 pl-2 basis-0">
              <Avatar
                className="w-28 h-28 mt-1 border-2 border-current rounded-lg"
                src={p.character.image}
                variant="rounded"
                style={avatarStyle}
              />
            </div>
            <div className="grow flex flex-col justify-around basis-0">
              <Button
                className="flex flex-col"
                variant="contained"
                style={HpColor}
                onClick={() => hpDialogState.dialogActions.setIsOpen(true)}
              >
                {hpDialogState.isLoading ? (
                  <CircularProgress style={whiteColor} />
                ) : (
                  <>
                    <div className="grow basis-0 text-xl">
                      {currentHP}/{currentMaximumHP}
                    </div>
                    <div className="uppercase text-xxs basis-0">hit points</div>
                  </>
                )}
              </Button>
              <Button
                className="flex flex-col"
                variant="contained"
                style={ManaColor}
                onClick={() => manaDialogState.dialogActions.setIsOpen(true)}
              >
                {manaDialogState.isLoading ? (
                  <CircularProgress style={whiteColor} />
                ) : (
                  <>
                    <div className="grow basis-0 text-xl">
                      {CalculateCurrentMana(p.character)}/
                      {CalculateMaximumMana(p.character)}
                    </div>
                    <div className="uppercase text-xxs basis-0">mana</div>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grow flex flex-row basis-0">
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={coloredStyle}>
                    +
                    {CalculateProficiencyBonous(
                      p.character.class.proficiencyBonous,
                      p.character.level
                    )}
                  </span>
                  /
                  <span style={coloredStyle}>
                    D
                    {CalculateProficiencyBonous(
                      p.character.class.proficiencyBonous,
                      p.character.level
                    ) * 2}
                  </span>
                </span>
              </div>
              <div className="text-xxs uppercase">proficiency</div>
            </div>
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <span className="text-2xl font-bold" style={coloredStyle}>
                  {p.character.speed}
                </span>
                <span className="text-xxs pl-1 align-middle">FT.</span>
              </div>
              <div className="text-xxs uppercase">Walk Speed</div>
            </div>
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <div className="flex flex-row">
                  <div className="grow"></div>
                  <span className="text-2xl font-bold" style={coloredStyle}>
                    {CalculateExpertTotalValue(
                      p.character,
                      p.character.inititive
                    )}
                  </span>
                  <div className="grow">
                    {p.character.inititive.hasAdvantage ? (
                      <Circle
                        text="A"
                        className="w-5 ml-1 mt-1"
                        filled
                        color={theme.palette.success.main}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xxs uppercase">initiative</div>
            </div>
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={coloredStyle}>{CalculateAC(p.character)}</span>
                </span>
              </div>
              <div className="text-xxs uppercase">armour class</div>
            </div>
          </div>
        </div>
      </Card>
      <HPDialog
        maximumModifire={
          p.character.hp.maximumModifire == 0
            ? ""
            : p.character.hp.maximumModifire.toString()
        }
        tempHP={p.character.hp.temp == 0 ? "" : p.character.hp.temp.toString()}
        onSave={(temp, maximum) => {
          p.character.hp.temp = temp ? Number(temp) : 0;
          p.character.hp.maximumModifire = maximum ? Number(maximum) : 0;
          update(p.character, hpDialogState.dialogActions.setIsLoading);
        }}
        onDamage={(val) => {
          p.character.hp.temp -= val;
          if (p.character.hp.temp < 0) {
            p.character.hp.damageTakenAfterTemp += p.character.hp.temp * -1;
            p.character.hp.temp = 0;
          }
          update(p.character, hpDialogState.dialogActions.setIsLoading);
        }}
        onHeal={(val) => {
          p.character.hp.damageTakenAfterTemp -= val;
          if (p.character.hp.damageTakenAfterTemp < 0)
            p.character.hp.damageTakenAfterTemp = 0;
          update(p.character, hpDialogState.dialogActions.setIsLoading);
        }}
      />

      <ManaDialog
        level6={!p.character.spellCasting.used6thLevel}
        level7={!p.character.spellCasting.used7thLevel}
        level8={!p.character.spellCasting.used8thLevel}
        level9={!p.character.spellCasting.used9thLevel}
        onChange={(val) => {
          p.character.spellCasting.usedMana += val;
          if (
            p.character.spellCasting.usedMana >
            CalculateMaximumMana(p.character)
          )
            p.character.spellCasting.usedMana = CalculateMaximumMana(
              p.character
            );
          if (p.character.spellCasting.usedMana < 0)
            p.character.spellCasting.usedMana = 0;
          update(p.character, manaDialogState.dialogActions.setIsLoading);
        }}
        onSave={(state) => {
          p.character.spellCasting.used6thLevel = !state.level6;
          p.character.spellCasting.used7thLevel = !state.level7;
          p.character.spellCasting.used8thLevel = !state.level8;
          p.character.spellCasting.used9thLevel = !state.level9;
          update(p.character, manaDialogState.dialogActions.setIsLoading);
        }}
      />
    </>
  );
});
