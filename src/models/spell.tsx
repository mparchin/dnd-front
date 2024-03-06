import { immerable } from "immer";

export class RegisterInfo {
  name: string = "";
  email: string = "";
  password: string = "";
}

export class JWTToken {
  token: string = "";
  expiration: number = 0;
  refreshToken: string = "";
  refreshExpiration: number = 0;
}

export class LoginInfo {
  email: string = "";
  password: string = "";
}

export class UserProfile {
  guid: string = "";
  name: string = "";
  email: string = "";
  role?: string = "";
}

export class Spell {
  [immerable] = true;
  id: number = 0;
  level: number = 0;
  name: string = "";
  book?: string;
  schoolName?: string;
  spellListName: string = "";
  hasVerbalComponent: boolean = false;
  hasSomaticComponent: boolean = false;
  hasMaterialComponent: boolean = false;
  materials?: string;
  spellTags?: string[];
  savingThrow?: string;
  damageTypes?: string;
  action: string = "";
  longerAction?: string;
  range: string = "";
  duration: string = "";
  isConcentration: boolean = false;
  isRitual: boolean = false;
  restrictedClasses?: string[];
  description: string = "";
  higherLevelDescription?: string;
  damageFormula?: string;
  relatedConditions?: Condition[];
  time: number = 0;
}

export class Condition {
  id: number = 0;
  name: string = "";
  description: string = "";
  time: number = 0;
}

export class Feature {
  id: number = 0;
  name: string = "";
  description: string = "";
  level: number = 0;
  order?: number = 0;
  isDetails: boolean = false;
  className: string = "";
  subclass?: string = "";
  time: number = 0;
}

export class Subclass {
  name: string = "";
  className: string = "";
  constructor(name?: string, className?: string) {
    this.name = name ?? "";
    this.className = className ?? "";
  }
}

export class Feat {
  [immerable] = true;
  id: number = 0;
  name: string = "";
  description: string = "";
  level: number = 0;
  prerequisite?: string = "";
  book?: string = "";
  repeatable?: string = "";
  time: number = 0;
}

export interface FilterList {
  levels: number[];
  books: string[];
  schools: string[];
  lists: string[];
  tags: string[];
  savingThrows: string[];
  damageTypes: string[];
  actions: string[];
  ranges: string[];
  durations: string[];
  classes: string[];
  conditions: string[];
}

export interface FeatFilterList {
  levels: number[];
  prerequisite: string[];
  repeatable: string[];
  books: string[];
}

export class Rule {
  id: number = 0;
  name: string = "";
  category: string = "";
  description: string = "";
  order?: number;
  time: number = 0;
}

export class Class {
  [immerable] = true;
  id: number = 0;
  name: string = "";
  proficiencyBonous: string = "";
  hitDie: number = 0;
  manaPerLevel: string = "";
  casterSubClassName: string = "";
  time: number = 0;
}
