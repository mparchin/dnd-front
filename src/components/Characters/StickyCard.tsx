import { Card, IconButton, Avatar, Button, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import { Bonfire } from "../../assets/bonfire";
import { usePrimaryColor } from "../../theme";
import { Circle } from "../../assets/circle";
import { HPDialog, useHPDialogStore } from "./Edit/HPDialog";
import {
  CharactersListState,
  useCharacterListStore,
} from "../../API/characters";
import { Character } from "../../models/Character/Character";
import { editCharacter, useTokenStore } from "../../api";
import { JWTToken } from "../../models/spell";
import { useNetworkStore } from "../NetworkPrompt";

interface Props {
  id: number;
  currentHp: number;
  maximumHp: number;
  currentMana: number;
  maximumMana: number;
  profBonous: number;
  speed: number;
  inititive: string;
  inititiveAdvantage: boolean;
  armourClass: number;
  maximumHpModifire: number;
  tempHp: number;
}

function SaveChar(
  reportNetwork: () => void,
  charactersStore: CharactersListState,
  char: Character,
  token: JWTToken
) {
  editCharacter(char, token)
    .then((savedChar) => {
      const chars = charactersStore.characters.filter(
        (char) => char.id != savedChar.id
      );
      chars.push(savedChar);
      charactersStore.setCharacters(chars);
    })
    .catch(reportNetwork);
  // .finally(() => state.dialogActions.setShowProgress(false));
}

export const StickyCard = memo((p: Props) => {
  const characterState = useCharacterListStore((state) => state);
  const token = useTokenStore((state) => state.token) ?? new JWTToken();
  const reportNetwork = useNetworkStore((state) => state.report);
  const character = useMemo(
    () => characterState.characters.find((char) => char.id == p.id),
    [p.id, characterState.characters]
  );
  const HPDialogStateOpen = useHPDialogStore(
    (state) => state.dialogActions.setIsOpen
  );
  const theme = useTheme();
  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const HpColor = useMemo(
    () => ({ backgroundColor: theme.palette.success.main }),
    [theme.palette.success]
  );
  const ManaColor = useMemo(
    () => ({ backgroundColor: theme.palette.primary.main }),
    [theme.palette.primary]
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
                src="/asghar.jpg"
                variant="rounded"
                style={coloredStyle}
              />
            </div>
            <div className="grow flex flex-col justify-around basis-0">
              <Button
                className="flex flex-col"
                variant="contained"
                style={HpColor}
                onClick={() => HPDialogStateOpen(true)}
              >
                <div className="grow basis-0 text-xl">
                  {p.currentHp}/{p.maximumHp}
                </div>
                <div className="uppercase text-xxs basis-0">hit points</div>
              </Button>
              <Button
                className="flex flex-col"
                variant="contained"
                style={ManaColor}
              >
                <div className="grow basis-0 text-xl">
                  {p.currentMana}/{p.maximumMana}
                </div>
                <div className="uppercase text-xxs basis-0">mana</div>
              </Button>
            </div>
          </div>

          <div className="grow flex flex-row basis-0">
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <span className="text-2xl font-bold">
                  <span style={coloredStyle}>+{p.profBonous}</span>/
                  <span style={coloredStyle}>D{p.profBonous * 2}</span>
                </span>
              </div>
              <div className="text-xxs uppercase">proficiency</div>
            </div>
            <div className="grow basis-0 flex flex-col text-center">
              <div className="grow">
                <span className="text-2xl font-bold" style={coloredStyle}>
                  {p.speed}
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
                    {p.inititive}
                  </span>
                  <div className="grow">
                    {p.inititiveAdvantage ? (
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
                  <span style={coloredStyle}>{p.armourClass}</span>
                </span>
              </div>
              <div className="text-xxs uppercase">armour class</div>
            </div>
          </div>
        </div>
      </Card>
      <HPDialog
        maximumModifire={
          p.maximumHpModifire == 0 ? "" : p.maximumHpModifire.toString()
        }
        tempHP={p.tempHp == 0 ? "" : p.tempHp.toString()}
        onSave={(temp, maximum) => {
          if (!character) return;
          character.hp.temp = temp ? Number(temp) : 0;
          character.hp.maximumModifire = maximum ? Number(maximum) : 0;
          SaveChar(reportNetwork, characterState, character, token);
        }}
        onDamage={(val) => {
          if (!character) return;
          character.hp.temp -= val;
          if (character.hp.temp < 0) {
            character.hp.damageTakenAfterTemp += character.hp.temp * -1;
            character.hp.temp = 0;
          }
          SaveChar(reportNetwork, characterState, character, token);
        }}
        onHeal={(val) => {
          if (!character) return;
          character.hp.damageTakenAfterTemp -= val;
          if (character.hp.damageTakenAfterTemp < 0)
            character.hp.damageTakenAfterTemp = 0;
          SaveChar(reportNetwork, characterState, character, token);
        }}
      />
    </>
  );
});
