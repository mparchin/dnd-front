import { immerable } from "immer";
import {
  ExtraFieldCalculations,
  calculateProficiencyBonous,
} from "../extraCalculations";
import { Class } from "../spell";
import { CharacterAttributes } from "./CharacterAttributes";
import { CharacterExpert } from "./CharacterExpert";
import { CharacterHitpoint } from "./CharacterHitpoint";
import { CharacterSpellCasting } from "./CharacterSpellCasting";

export class Character {
  [immerable] = true;
  id: number = 0;
  name: string = "";
  race: string = "";
  background: string = "";
  image?: string;
  class: Class = new Class();
  subClassName: string = "";
  level: number = 1;
  attributes: CharacterAttributes = new CharacterAttributes();
  speed: number = 30;
  inititive: CharacterExpert = new CharacterExpert("dex");
  armorClassExtra: string = "10";
  hp: CharacterHitpoint = new CharacterHitpoint();
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
}

export interface Character {
  AC: () => number;
  proficiencyBonous: () => number;
  hitDie: () => number;
}

Character.prototype.AC = function () {
  return ExtraFieldCalculations(this.armorClassExtra, this);
};
Character.prototype.proficiencyBonous = function () {
  return calculateProficiencyBonous(this.class.proficiencyBonous, this.level);
};
Character.prototype.hitDie = function () {
  return this.class.hitDie;
};
