import { immerable } from "immer";
import { Character } from "./Character";
import { ExtraFieldCalculations } from "../extraCalculations";

export class CharacterSpellCasting {
  [immerable] = true;
  usedMana: number = 0;
  castingAbility: string = "";
  attackExtra: string = "";
  dcExtra: string = "";
}

export interface CharacterSpellCasting {
  maximumMana: (char: Character) => number;
  attackModifire: (char: Character) => string;
  DC: (char: Character) => number;
  currentMana: (char: Character) => number;
}

CharacterSpellCasting.prototype.maximumMana = function (char) {
  var manaPerLevel =
    char.class.casterSubClassName &&
    char.subClassName != char.class.casterSubClassName
      ? ""
      : char.class.manaPerLevel;
  if (!manaPerLevel) return 0;
  manaPerLevel = manaPerLevel.replace("{", "").replace("}", "");
  return Number(manaPerLevel.split(",")[char.level - 1].split(":")[1]);
};
CharacterSpellCasting.prototype.attackModifire = function (char) {
  var extra = ExtraFieldCalculations(
    this.castingAbility && this.attackExtra
      ? `${this.castingAbility} + ${this.attackExtra}`
      : this.castingAbility
      ? this.castingAbility
      : this.attackExtra,
    char
  );
  return (
    `D${char.proficiencyBonous() * 2}` + (extra >= 0 ? `+${extra}` : extra)
  );
};
CharacterSpellCasting.prototype.DC = function (char) {
  return (
    ExtraFieldCalculations(
      this.castingAbility && this.dcExtra
        ? `${this.castingAbility} + ${this.dcExtra}`
        : this.castingAbility
        ? this.castingAbility
        : this.dcExtra,
      char
    ) +
    char.proficiencyBonous() +
    8
  );
};
CharacterSpellCasting.prototype.currentMana = function (char) {
  return this.maximumMana(char) - this.usedMana;
};
