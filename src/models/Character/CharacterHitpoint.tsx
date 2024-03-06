import { immerable } from "immer";

export class CharacterHitpoint {
  [immerable] = true;
  customMaximum?: number;
  averageMaximumExtra: string = "";
  maximumModifire: number = 0;
  temp: number = 0;
  damageTakenAfterTemp: number = 0;
}
