import { immerable } from "immer";

export class CharacterExtra {
  [immerable] = true;
  id: number = 0;
  name: string = "";
  maximumFormula: string = "";
  used: number = 0;
  refreshOnShortRest: boolean = false;
  refreshOnLongRest: boolean = false;
  customRefreshFormula: string = "";

  constructor(
    id = 0,
    name = "",
    maximumFormula = "",
    used = 0,
    refreshOnShortRest = false,
    refreshOnLongRest = false,
    customRefreshFormula = ""
  ) {
    this.id = id;
    this.name = name;
    this.maximumFormula = maximumFormula;
    this.used = used;
    this.refreshOnShortRest = refreshOnShortRest;
    this.refreshOnLongRest = refreshOnLongRest;
    this.customRefreshFormula = customRefreshFormula;
  }
}
