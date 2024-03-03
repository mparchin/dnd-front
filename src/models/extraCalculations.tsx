import { Character } from "./spell";

export function calculateProficiencyBonous(extra: string, level: number) {
  extra = extra.replace(/\s/g, "");
  extra = extra.toLowerCase();
  extra = extra.replace(/level/g, level.toString());
  extra = extra.replace(/lvl/g, level.toString());
  return Math.floor(eval(extra));
}

export function ExtraFieldCalculations(extra: string, char: Character) {
  if (!extra) return 0;
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
  extra = extra.replace(/lvl/g, char.level.toString());
  try {
    return Math.floor(eval(extra));
  } catch {
    return 0;
  }
}
