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
