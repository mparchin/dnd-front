import { immerable } from "immer";

export class CharacterSpellCasting {
  [immerable] = true;
  usedMana: number = 0;
  castingAbility: string = "";
  attackExtra: string = "";
  dcExtra: string = "";
  used6thLevel: boolean = false;
  used7thLevel: boolean = false;
  used8thLevel: boolean = false;
  used9thLevel: boolean = false;
}
