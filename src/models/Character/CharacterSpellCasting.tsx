import { immerable } from "immer";

export class CharacterSpellCasting {
  [immerable] = true;
  usedMana: number = 0;
  castingAbility: string = "";
  attackExtra: string = "";
  dcExtra: string = "";
}
