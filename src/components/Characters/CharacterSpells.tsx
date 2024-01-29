import { Button, Card, useTheme } from "@mui/material";
import Circle from "../../assets/circle";
import { useMemo } from "react";
import { useThemeStore, getPrimaryString } from "../../theme";

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
export default function (props: CharacterSpellProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColorString = useMemo(
    () => getPrimaryString(theme, themeStore),
    [theme, themeStore]
  );
  const spellLevels = useMemo(
    () => [...new Set(props.spells.map((spell) => spell.level))].sort(),
    [props.spells]
  );

  return spellLevels.map((level) => (
    <div
      key={level}
      className="md:w-96 w-full flex flex-row mb-10 mr-4 ml-4 last:mb-2 md:last:mb-10"
    >
      <Card
        className="uppercase text-sm text-center p-2 pt-4 pb-4"
        elevation={3}
        style={{
          writingMode: "vertical-lr",
        }}
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
  ));
}
