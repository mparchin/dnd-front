import { immerable } from "immer";
import { ExtraFieldCalculations } from "../extraCalculations";
import { Character } from "./Character";

export class CharacterExpert {
  [immerable] = true;
  hasAdvantage: boolean = false;
  isProficient: boolean = false;
  isExpert: boolean = false;
  attributeName: string = "";
  extraText: string = "";

  constructor(attribute?: string) {
    this.attributeName = attribute ?? "";
  }
}

export interface CharacterExpert {
  totalValue: (char: Character) => string;
  totalPassiveValue: (char: Character) => number;
}

CharacterExpert.prototype.totalValue = function (char) {
  var extra = ExtraFieldCalculations(
    this.attributeName && this.extraText
      ? `${this.attributeName} + ${this.extraText}`
      : this.attributeName
      ? this.attributeName
      : this.extraText,
    char
  );
  return (
    (this.isProficient
      ? `D${char.proficiencyBonous() * 2}`
      : this.isExpert
      ? `2D${char.proficiencyBonous() * 2}`
      : "") + (extra >= 0 ? `+${extra}` : extra)
  );
};
CharacterExpert.prototype.totalPassiveValue = function (char) {
  var extra = ExtraFieldCalculations(
    this.attributeName && this.extraText
      ? `${this.attributeName} + ${this.extraText}`
      : this.attributeName
      ? this.attributeName
      : this.extraText,
    char
  );
  return (
    extra +
    (this.isProficient ? char.proficiencyBonous() : 0) +
    (this.isExpert ? char.proficiencyBonous() * 2 : 0) +
    10
  );
};
