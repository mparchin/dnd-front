import { immerable } from "immer";

export class CharacterAttributes {
  [immerable] = true;
  strength: number;
  dextrity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

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
}

export interface CharacterAttributes {
  strengthModifire: () => number;
  dextrityModifire: () => number;
  constitutionModifire: () => number;
  intelligenceModifire: () => number;
  wisdomModifire: () => number;
  charismaModifire: () => number;

  getModifire: (attribute: number) => number;

  getAttribute: (str: string) => number;
  getAttributeModifire: (str: string) => number;
}

CharacterAttributes.prototype.strengthModifire = function () {
  return this.getModifire(this.strength);
};
CharacterAttributes.prototype.dextrityModifire = function () {
  return this.getModifire(this.dextrity);
};
CharacterAttributes.prototype.constitutionModifire = function () {
  return this.getModifire(this.constitution);
};
CharacterAttributes.prototype.intelligenceModifire = function () {
  return this.getModifire(this.intelligence);
};
CharacterAttributes.prototype.wisdomModifire = function () {
  return this.getModifire(this.wisdom);
};
CharacterAttributes.prototype.charismaModifire = function () {
  return this.getModifire(this.charisma);
};
CharacterAttributes.prototype.getModifire = function (attribute) {
  return Math.floor((attribute - 10) / 2);
};
CharacterAttributes.prototype.getAttribute = function (str) {
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
};
CharacterAttributes.prototype.getAttributeModifire = function (str) {
  return this.getModifire(this.getAttribute(str));
};
