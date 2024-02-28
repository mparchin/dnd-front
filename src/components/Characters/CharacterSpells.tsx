import { Button, Card } from "@mui/material";
import { Circle } from "../../assets/circle";
import { memo, useMemo } from "react";
import { usePrimaryColor, usePrimaryColorString } from "../../theme";

interface CharSpellDetail {
  id: number;
  name: string;
  time: string;
  prepaired?: boolean;
  concentration?: boolean;
  ritual?: boolean;
  level: number;
}

interface CharacterSpellProps {
  spells: CharSpellDetail[];
}
export const CharacterSpells = memo((props: CharacterSpellProps) => {
  const primaryColorString = usePrimaryColorString();
  const primaryColor = usePrimaryColor();
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);
  const spellLevels = useMemo(
    () => [...new Set(props.spells.map((spell) => spell.level))].sort(),
    [props.spells]
  );

  return (
    <>
      <div className="w-full flex flex-row justify-center mb-5">
        <div className="flex flex-col text-center w-20 mr-5">
          <div className="grow">
            <span className="text-2xl font-bold">
              <span style={coloredStyle}>+5</span>
            </span>
          </div>
          <div className="text-xxs uppercase">modifire</div>
        </div>
        <div className="flex flex-col text-center w-20 mr-5">
          <div className="grow">
            <span className="text-2xl font-bold">
              <span style={coloredStyle}>D4+5</span>
            </span>
          </div>
          <div className="text-xxs uppercase">Spell attack</div>
        </div>
        <div className="flex flex-col text-center w-20">
          <div className="grow">
            <span className="text-2xl font-bold" style={coloredStyle}>
              15
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
          className="p-2 mb-10"
        >
          Manage spells
        </Button>
        <div className="grow"></div>
      </div>
      {spellLevels.map((level) => (
        <div
          key={level}
          className="md:w-96 w-full flex flex-row mb-10 mr-4 ml-4 last:mb-2 md:last:mb-10"
        >
          <Card
            className="uppercase text-vertical-lr text-sm text-center p-2 pt-4 pb-4"
            elevation={3}
          >
            {level == 0 ? "cantrips" : `level ${level}`}
          </Card>
          <div className="grow flex flex-col w-full pr-4">
            {props.spells
              .filter((spell) => spell.level == level)
              .map((spell) => (
                <div
                  key={spell.id}
                  className="w-full flex flex-row ml-2 pb-2 pt-2 border-b-2 rounded-md"
                >
                  {spell.level > 0 ? (
                    <>
                      <Circle
                        className="w-4 mr-0.5 shrink-0"
                        filled={spell.prepaired}
                        text="P"
                      />
                      <Circle
                        className="w-4 mr-0.5 shrink-0"
                        filled={spell.concentration}
                        text="C"
                      />
                      <Circle
                        className="w-4 shrink-0"
                        filled={spell.ritual}
                        text="R"
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="capitalize ml-2 mr-2 grow flex flex-col">
                    <span className="grow"></span>
                    <span className="capitalize">{spell.name}</span>
                    <span className="grow"></span>
                  </div>
                  <div className="ml-1 mr-1 flex flex-col">
                    <span className="grow"></span>
                    <span className="capitalize text-xxs">{spell.time}</span>
                    <span className="grow"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="grow"></div>
                    <Button
                      variant="outlined"
                      color={primaryColorString}
                      className="p-0 h-fit"
                    >
                      Cast
                    </Button>
                    <div className="grow"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
});
