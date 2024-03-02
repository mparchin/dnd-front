import { Card, TextField } from "@mui/material";
import { memo } from "react";
import { ComboBox } from "../../Controls/ComboBox";
import { ExtraField } from "../../Controls/ExtraField";
import { usePrimaryColorString } from "../../../theme";

interface Props {
  castingAbility?: string;
  onCastingAbilityChange?: (str: string) => void;
  profiencyBonous?: number;
  castingAbilityValue?: number;
  spellAttackExtra?: string;
  onSpellAttackExtraChange?: (str: string) => void;
  spellSaveDCExtra?: string;
  onSpellSaveDCExtra?: (str: string) => void;
}

export const SpellCastingEdit = memo((p: Props) => {
  const primaryColorString = usePrimaryColorString();
  const centerTextStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  };
  return (
    <>
      <ComboBox
        className="w-88 m-2"
        lable="spell casting ability"
        options={[
          { value: "str", text: "strength" },
          { value: "dex", text: "dextrity" },
          { value: "con", text: "constitution" },
          { value: "int", text: "intelligence" },
          { value: "wis", text: "wisdom" },
          { value: "cha", text: "charisma" },
        ]}
        value={p.castingAbility}
        onChange={p.onCastingAbilityChange}
      />
      <div className="flex flex-row w-88 m-2">
        <Card
          className="capitalize flex flex-col text-vertical-lr text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
          elevation={3}
        >
          Spell attack
        </Card>
        <div className="flex flex-row flex-wrap grow basis-0">
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label="Prof"
              color={primaryColorString}
              disabled
              value={`d${(p.profiencyBonous ?? 2) * 2}`}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label={p.castingAbility?.toUpperCase()}
              color={primaryColorString}
              disabled
              value={Math.floor(((p.castingAbilityValue ?? 10) - 10) / 2)}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <ExtraField
            className="w-full mb-1"
            value={p.spellAttackExtra}
            onChange={p.onSpellAttackExtraChange}
          />
        </div>
      </div>

      <div className="flex flex-row w-88 m-2">
        <Card
          className="capitalize flex text-vertical-lr flex-col text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
          elevation={3}
        >
          Spell Save DC
        </Card>
        <div className="flex flex-row flex-wrap grow basis-0">
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label=""
              color={primaryColorString}
              disabled
              value={8}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label="Prof"
              color={primaryColorString}
              disabled
              value={p.profiencyBonous ?? 2}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <div className="mr-1 w-14 mb-1">
            <TextField
              className="text-center"
              label={p.castingAbility?.toUpperCase()}
              color={primaryColorString}
              disabled
              value={Math.floor(((p.castingAbilityValue ?? 10) - 10) / 2)}
              sx={centerTextStyle}
            />
          </div>
          <div className="flex flex-col mr-1 mb-1">
            <div className="grow"></div>
            <span>+</span>
            <div className="grow"></div>
          </div>
          <ExtraField
            className="w-full mb-1"
            value={p.spellSaveDCExtra}
            onChange={p.onSpellSaveDCExtra}
          />
        </div>
      </div>
    </>
  );
});
