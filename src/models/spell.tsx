import { immerable } from "immer";

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
}

class CharacterAttributes {
  [immerable] = true;
  strength: number = 10;
  strengthModifire: () => number = () => this.getModifire(this.strength);
  dextrity: number = 10;
  dextrityModifire: () => number = () => this.getModifire(this.dextrity);
  constitution: number = 10;
  constitutionModifire: () => number = () =>
    this.getModifire(this.constitution);
  intelligence: number = 10;
  intelligenceModifire: () => number = () =>
    this.getModifire(this.intelligence);
  wisdom: number = 10;
  wisdomModifire: () => number = () => this.getModifire(this.wisdom);
  charisma: number = 10;
  charismaModifire: () => number = () => this.getModifire(this.charisma);

  private getModifire: (attribute: number) => number = (attribute) =>
    Math.floor((attribute - 10) / 2);
}

export function ExtraFieldCalculations(extra: string, char: Character) {
  extra = extra.replace(/\s/g, "");
  extra = extra.toLowerCase();
  extra = extra.replace(/proficiency/g, char.proficiencyBonous().toString());
  extra = extra.replace(/prof/g, char.proficiencyBonous().toString());
  extra = extra.replace(/expert/g, (char.proficiencyBonous() * 2).toString());
  extra = extra.replace(/exp/g, (char.proficiencyBonous() * 2).toString());
  extra = extra.replace(
    /strength/g,
    char.attributes.strengthModifire().toString()
  );
  extra = extra.replace(/str/g, char.attributes.strengthModifire().toString());
  extra = extra.replace(
    /dextrity/g,
    char.attributes.dextrityModifire().toString()
  );
  extra = extra.replace(/dex/g, char.attributes.dextrityModifire().toString());
  extra = extra.replace(
    /constitution/g,
    char.attributes.constitutionModifire().toString()
  );
  extra = extra.replace(
    /con/g,
    char.attributes.constitutionModifire().toString()
  );
  extra = extra.replace(
    /intelligence/g,
    char.attributes.intelligenceModifire().toString()
  );
  extra = extra.replace(
    /int/g,
    char.attributes.intelligenceModifire().toString()
  );
  extra = extra.replace(/wisdom/g, char.attributes.wisdomModifire().toString());
  extra = extra.replace(/wis/g, char.attributes.wisdomModifire().toString());
  extra = extra.replace(
    /charisma/g,
    char.attributes.charismaModifire().toString()
  );
  extra = extra.replace(/cha/g, char.attributes.charismaModifire().toString());
  extra = extra.replace(/level/g, char.level.toString());
  return Math.floor(eval(extra));
}

class CharacterExpert {
  [immerable] = true;
  hasAdvantage: boolean = false;
  isProficient: boolean = false;
  isExpert: boolean = false;
  attributeName: string = "";
  extraText: string = "";

  totalValue: () => string = () => "";

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
  maximumMana: (char: Character) => number = () => 0;
  currentMana: number = 0;
  castingAbility: string = "";
  attackExtra: string = "";
  attackModifire: (char: Character) => string = (char: Character) =>
    `${char.proficiencyBonous() * 2}d` +
    ExtraFieldCalculations(
      this.castingAbility
        ? `${this.castingAbility} + ${this.attackExtra}`
        : this.attackExtra,
      char
    );
  DCExtra: string = "";
  DC: (char: Character) => number = (char: Character) =>
    ExtraFieldCalculations(
      this.castingAbility
        ? `${this.castingAbility} + ${this.DCExtra}`
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
  slightOfHands: CharacterExpert = new CharacterExpert("dex");
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

  proficiencyBonous: () => number = () => 2;
  hitDie: () => number = () => 6;
}
