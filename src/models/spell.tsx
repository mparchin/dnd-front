import { immerable } from "immer";
import {
  ExtraFieldCalculations,
  calculateProficiencyBonous,
} from "./extraCalculations";

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

export class CharacterAttributes {
  [immerable] = true;
  strength: number;
  strengthModifire: () => number = () => this.getModifire(this.strength);
  dextrity: number;
  dextrityModifire: () => number = () => this.getModifire(this.dextrity);
  constitution: number;
  constitutionModifire: () => number = () =>
    this.getModifire(this.constitution);
  intelligence: number;
  intelligenceModifire: () => number = () =>
    this.getModifire(this.intelligence);
  wisdom: number;
  wisdomModifire: () => number = () => this.getModifire(this.wisdom);
  charisma: number;
  charismaModifire: () => number = () => this.getModifire(this.charisma);

  constructor(
    strength?: number,
    dextrity?: number,
    constitution?: number,
    intelligence?: number,
    wisdom?: number,
    charisma?: number
  ) {
    this.strength = strength ?? 10;
    this.dextrity = dextrity ?? 10;
    this.constitution = constitution ?? 10;
    this.intelligence = intelligence ?? 10;
    this.wisdom = wisdom ?? 10;
    this.charisma = charisma ?? 10;
  }

  private getModifire: (attribute: number) => number = (attribute) =>
    Math.floor((attribute - 10) / 2);

  getAttribute(str: string) {
    str = str.toLowerCase();
    return str.startsWith("str")
      ? this.strength
      : str.startsWith("dex")
      ? this.dextrity
      : str.startsWith("con")
      ? this.constitution
      : str.startsWith("int")
      ? this.intelligence
      : str.startsWith("wis")
      ? this.wisdom
      : this.charisma;
  }
  getAttributeModifire(str: string) {
    return this.getModifire(this.getAttribute(str));
  }
}

export class CharacterExpert {
  [immerable] = true;
  hasAdvantage: boolean = false;
  isProficient: boolean = false;
  isExpert: boolean = false;
  attributeName: string = "";
  extraText: string = "";

  totalValue(char: Character) {
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
  }

  totalPassiveValue(char: Character) {
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
  }

  constructor(attribute: string) {
    this.attributeName = attribute;
  }
}

class CharacterHitpoint {
  [immerable] = true;
  customMaximum?: number;
  averageMaximumExtra: string = "";
  averageMaximum: (char: Character) => number = (char: Character) =>
    char.hitDie() +
    char.attributes.constitutionModifire() +
    ExtraFieldCalculations(this.averageMaximumExtra, char) +
    (char.level - 1) *
      (char.hitDie() / 2 +
        1 +
        char.attributes.constitutionModifire() +
        ExtraFieldCalculations(this.averageMaximumExtra, char));
  maximumModifire: number = 0;
  currentMaximum: (char: Character) => number = (char: Character) =>
    this.customMaximum
      ? this.customMaximum + this.maximumModifire
      : this.averageMaximum(char) + this.maximumModifire;
  temp: number = 0;
  current: number = 0;
  bloodiedThreshold: (char: Character) => number = (char: Character) =>
    Math.floor(this.currentMaximum(char) * 0.3);
}

class CharacterSpellCasting {
  [immerable] = true;
  maximumMana: (char: Character) => number = (char: Character) => {
    var manaPerLevel =
      char.class.casterSubClassName &&
      char.subClass.name != char.class.casterSubClassName
        ? ""
        : char.class.manaPerLevel;
    if (!manaPerLevel) return 0;
    manaPerLevel = manaPerLevel.replace("{", "").replace("}", "");
    return Number(manaPerLevel.split(",")[char.level - 1].split(":")[1]);
  };
  currentMana: number = 0;
  castingAbility: string = "";
  attackExtra: string = "";
  attackModifire: (char: Character) => string = (char: Character) => {
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
  DCExtra: string = "";
  DC: (char: Character) => number = (char: Character) =>
    ExtraFieldCalculations(
      this.castingAbility && this.DCExtra
        ? `${this.castingAbility} + ${this.DCExtra}`
        : this.castingAbility
        ? this.castingAbility
        : this.DCExtra,
      char
    ) +
    char.proficiencyBonous() +
    8;
}

export class Character {
  [immerable] = true;
  localId: number = 0;
  name: string = "";
  race: string = "";
  background: string = "";
  image?: string;
  class: Class = new Class();
  subClass: Subclass = new Subclass();
  level: number = 1;
  attributes: CharacterAttributes = new CharacterAttributes();
  speed: number = 30;
  inititive: CharacterExpert = new CharacterExpert("dex");
  armorClassExtra: string = "";
  AC: () => number = () => ExtraFieldCalculations(this.armorClassExtra, this);
  HP: CharacterHitpoint = new CharacterHitpoint();
  spellCasting: CharacterSpellCasting = new CharacterSpellCasting();

  strengthSave: CharacterExpert = new CharacterExpert("str");
  dextritySave: CharacterExpert = new CharacterExpert("dex");
  constitutionSave: CharacterExpert = new CharacterExpert("con");
  intelligenceSave: CharacterExpert = new CharacterExpert("int");
  wisdomSave: CharacterExpert = new CharacterExpert("wis");
  charismaSave: CharacterExpert = new CharacterExpert("cha");

  athletics: CharacterExpert = new CharacterExpert("str");
  acrobatics: CharacterExpert = new CharacterExpert("dex");
  sleightOfHands: CharacterExpert = new CharacterExpert("dex");
  stealth: CharacterExpert = new CharacterExpert("dex");
  arcana: CharacterExpert = new CharacterExpert("int");
  history: CharacterExpert = new CharacterExpert("int");
  investigation: CharacterExpert = new CharacterExpert("int");
  nature: CharacterExpert = new CharacterExpert("int");
  religion: CharacterExpert = new CharacterExpert("int");
  animalHandling: CharacterExpert = new CharacterExpert("wis");
  insight: CharacterExpert = new CharacterExpert("wis");
  medicine: CharacterExpert = new CharacterExpert("wis");
  perception: CharacterExpert = new CharacterExpert("wis");
  survival: CharacterExpert = new CharacterExpert("wis");
  deception: CharacterExpert = new CharacterExpert("cha");
  intimidation: CharacterExpert = new CharacterExpert("cha");
  performance: CharacterExpert = new CharacterExpert("cha");
  persuasion: CharacterExpert = new CharacterExpert("cha");

  time: number = 0;

  proficiencyBonous: () => number = () =>
    calculateProficiencyBonous(this.class.proficiencyBonous, this.level);
  hitDie: () => number = () => this.class.hitDie;
}
