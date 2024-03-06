import { immerable } from "immer";

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
