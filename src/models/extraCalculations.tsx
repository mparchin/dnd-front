import { Character } from "./Character/Character";
import { CharacterAttributes } from "./Character/CharacterAttributes";
import { CharacterExpert } from "./Character/CharacterExpert";

export function ExtraFieldCalculations(extra: string, char: Character) {
  if (!extra) return 0;
  extra = extra.replace(/\s/g, "");
  extra = extra.toLowerCase();
  extra = extra.replace(
    /proficiency/g,
    CalculateProficiencyBonous(
      char.class.proficiencyBonous,
      char.level
    ).toString()
  );
  extra = extra.replace(
    /prof/g,
    CalculateProficiencyBonous(
      char.class.proficiencyBonous,
      char.level
    ).toString()
  );
  extra = extra.replace(
    /expert/g,
    (
      CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) * 2
    ).toString()
  );
  extra = extra.replace(
    /exp/g,
    (
      CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) * 2
    ).toString()
  );
  extra = extra.replace(
    /strength/g,
    CalculateModifire(char.attributes.strength).toString()
  );
  extra = extra.replace(
    /str/g,
    CalculateModifire(char.attributes.strength).toString()
  );
  extra = extra.replace(
    /dextrity/g,
    CalculateModifire(char.attributes.dextrity).toString()
  );
  extra = extra.replace(
    /dex/g,
    CalculateModifire(char.attributes.dextrity).toString()
  );
  extra = extra.replace(
    /constitution/g,
    CalculateModifire(char.attributes.constitution).toString()
  );
  extra = extra.replace(
    /con/g,
    CalculateModifire(char.attributes.constitution).toString()
  );
  extra = extra.replace(
    /intelligence/g,
    CalculateModifire(char.attributes.intelligence).toString()
  );
  extra = extra.replace(
    /int/g,
    CalculateModifire(char.attributes.intelligence).toString()
  );
  extra = extra.replace(
    /wisdom/g,
    CalculateModifire(char.attributes.wisdom).toString()
  );
  extra = extra.replace(
    /wis/g,
    CalculateModifire(char.attributes.wisdom).toString()
  );
  extra = extra.replace(
    /charisma/g,
    CalculateModifire(char.attributes.charisma).toString()
  );
  extra = extra.replace(
    /cha/g,
    CalculateModifire(char.attributes.charisma).toString()
  );
  extra = extra.replace(/level/g, char.level.toString());
  extra = extra.replace(/lvl/g, char.level.toString());
  try {
    return Math.floor(eval(extra));
  } catch {
    return 0;
  }
}

export function CalculateProficiencyBonous(profFormula: string, level: number) {
  profFormula = profFormula.replace(/\s/g, "");
  profFormula = profFormula.toLowerCase();
  profFormula = profFormula.replace(/level/g, level.toString());
  profFormula = profFormula.replace(/lvl/g, level.toString());
  return Math.floor(eval(profFormula));
}

export function CalculateAC(character: Character) {
  return ExtraFieldCalculations(character.armorClassExtra, character);
}

export function CalculateModifire(attribute: number) {
  return Math.floor((attribute - 10) / 2);
}
export function CalculateAttribute(
  str: string,
  attributes: CharacterAttributes
) {
  str = str.toLowerCase();
  return str.startsWith("str")
    ? attributes.strength
    : str.startsWith("dex")
    ? attributes.dextrity
    : str.startsWith("con")
    ? attributes.constitution
    : str.startsWith("int")
    ? attributes.intelligence
    : str.startsWith("wis")
    ? attributes.wisdom
    : attributes.charisma;
}

export function CalculateExpertTotalValue(
  char: Character,
  expert: CharacterExpert
) {
  var extra = ExtraFieldCalculations(
    expert.attributeName && expert.extraText
      ? `${expert.attributeName} + ${expert.extraText}`
      : expert.attributeName
      ? expert.attributeName
      : expert.extraText,
    char
  );
  return (
    (expert.isProficient
      ? `D${
          CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) *
          2
        }`
      : expert.isExpert
      ? `2D${
          CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) *
          2
        }`
      : "") + (extra >= 0 ? `+${extra}` : extra)
  );
}
export function CalculateExpertTotalPassiveValue(
  char: Character,
  expert: CharacterExpert
) {
  var extra = ExtraFieldCalculations(
    expert.attributeName && expert.extraText
      ? `${expert.attributeName} + ${expert.extraText}`
      : expert.attributeName
      ? expert.attributeName
      : expert.extraText,
    char
  );
  return (
    extra +
    (expert.isProficient
      ? CalculateProficiencyBonous(char.class.proficiencyBonous, char.level)
      : 0) +
    (expert.isExpert
      ? CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) * 2
      : 0) +
    10
  );
}

function CalculateAverageMaximumHP(char: Character) {
  return (
    char.class.hitDie +
    CalculateModifire(char.attributes.constitution) +
    ExtraFieldCalculations(char.hp.averageMaximumExtra, char) +
    (char.level - 1) *
      (char.class.hitDie / 2 +
        1 +
        CalculateModifire(char.attributes.constitution) +
        ExtraFieldCalculations(char.hp.averageMaximumExtra, char))
  );
}
export function CalculateCurrentMaximumHP(char: Character) {
  return char.hp.customMaximum
    ? char.hp.customMaximum + char.hp.maximumModifire
    : CalculateAverageMaximumHP(char) + char.hp.maximumModifire;
}
export function CalculateBloodiedThreshold(char: Character) {
  return Math.floor(CalculateCurrentMaximumHP(char) * 0.3);
}
export function CalculateCurrentHP(char: Character) {
  return CalculateCurrentMaximumHP(char) - char.hp.damageTakenAfterTemp;
}

export function CalculateMaximumMana(char: Character) {
  var manaPerLevel =
    char.class.casterSubClassName &&
    char.subClassName != char.class.casterSubClassName
      ? ""
      : char.class.manaPerLevel;
  if (!manaPerLevel) return 0;
  manaPerLevel = manaPerLevel.replace("{", "").replace("}", "");
  return Number(manaPerLevel.split(",")[char.level - 1].split(":")[1]);
}
export function CalculateSpellAttack(char: Character) {
  var extra = ExtraFieldCalculations(
    char.spellCasting.castingAbility && char.spellCasting.attackExtra
      ? `${char.spellCasting.castingAbility} + ${char.spellCasting.attackExtra}`
      : char.spellCasting.castingAbility
      ? char.spellCasting.castingAbility
      : char.spellCasting.attackExtra,
    char
  );
  return (
    `D${
      CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) * 2
    }` + (extra >= 0 ? `+${extra}` : extra)
  );
}
export function CalculateSpellSaveDC(char: Character) {
  return (
    ExtraFieldCalculations(
      char.spellCasting.castingAbility && char.spellCasting.dcExtra
        ? `${char.spellCasting.castingAbility} + ${char.spellCasting.dcExtra}`
        : char.spellCasting.castingAbility
        ? char.spellCasting.castingAbility
        : char.spellCasting.dcExtra,
      char
    ) +
    CalculateProficiencyBonous(char.class.proficiencyBonous, char.level) +
    8
  );
}
export function CalculateCurrentMana(char: Character) {
  return CalculateMaximumMana(char) - char.spellCasting.usedMana;
}
