import { immerable } from "immer";

export class CharacterSpell {
  [immerable] = true;
  id: number = 0;
  spellId: number = 0;
  isPrepared: boolean = false;
  isAlwaysPrepared: boolean = false;

  constructor(
    id = 0,
    spellId = 0,
    isPrepared = false,
    isAlwaysPrepared = false
  ) {
    this.id = id;
    this.spellId = spellId;
    this.isPrepared = isPrepared;
    this.isAlwaysPrepared = isAlwaysPrepared;
  }
}
