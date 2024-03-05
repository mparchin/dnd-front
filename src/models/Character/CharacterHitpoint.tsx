import { immerable } from "immer";
import { Character } from "./Character";
import { ExtraFieldCalculations } from "../extraCalculations";

export class CharacterHitpoint {
  [immerable] = true;
  customMaximum?: number;
  averageMaximumExtra: string = "";
  maximumModifire: number = 0;
  temp: number = 0;
  damageTakenAfterTemp: number = 0;
}

export interface CharacterHitpoint {
  _averageMaximum: (char: Character) => number;
  currentMaximum: (char: Character) => number;
  bloodiedThreshold: (char: Character) => number;
  current: (char: Character) => number;
}

CharacterHitpoint.prototype._averageMaximum = function (char) {
  return (
    char.hitDie() +
    char.attributes.constitutionModifire() +
    ExtraFieldCalculations(this.averageMaximumExtra, char) +
    (char.level - 1) *
      (char.hitDie() / 2 +
        1 +
        char.attributes.constitutionModifire() +
        ExtraFieldCalculations(this.averageMaximumExtra, char))
  );
};
CharacterHitpoint.prototype.currentMaximum = function (char) {
  return this.customMaximum
    ? this.customMaximum + this.maximumModifire
    : this._averageMaximum(char) + this.maximumModifire;
};
CharacterHitpoint.prototype.bloodiedThreshold = function (char) {
  return Math.floor(this.currentMaximum(char) * 0.3);
};
CharacterHitpoint.prototype.current = function (char) {
  return this.currentMaximum(char) - this.damageTakenAfterTemp;
};
