export class Spell {
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
}

export function spellComparer(a: Spell, b: Spell) {
  if (
    a.id != b.id ||
    a.level != b.level ||
    a.name != b.name ||
    a.book != b.book ||
    a.schoolName != b.schoolName ||
    a.spellListName != b.spellListName ||
    a.hasVerbalComponent != b.hasVerbalComponent ||
    a.hasSomaticComponent != b.hasSomaticComponent ||
    a.hasMaterialComponent != b.hasMaterialComponent ||
    a.materials != b.materials ||
    a.savingThrow != b.savingThrow ||
    a.damageTypes != b.damageTypes ||
    a.action != b.action ||
    a.longerAction != b.longerAction ||
    a.range != b.range ||
    a.duration != b.duration ||
    a.isConcentration != b.isConcentration ||
    a.isRitual != b.isRitual ||
    a.description != b.description ||
    a.higherLevelDescription != b.higherLevelDescription ||
    a.damageFormula != b.damageFormula
  )
    return false;
  if (
    a.spellTags?.length != b.spellTags?.length ||
    a.restrictedClasses?.length != b.restrictedClasses?.length ||
    a.relatedConditions?.length != b.relatedConditions?.length
  )
    return false;

  if (
    (a.spellTags?.filter((tag) => !b.spellTags?.includes(tag)).length ?? 0) >
      0 ||
    (b.spellTags?.filter((tag) => !a.spellTags?.includes(tag)).length ?? 0) > 0
  )
    return false;

  if (
    (a.restrictedClasses?.filter((cls) => !b.restrictedClasses?.includes(cls))
      .length ?? 0) > 0 ||
    (b.restrictedClasses?.filter((cls) => !a.restrictedClasses?.includes(cls))
      .length ?? 0) > 0
  )
    return false;

  for (let i = 0; i < (a.relatedConditions?.length ?? 0); i++) {
    if (a.relatedConditions && b.relatedConditions)
      if (!conditionComparer(a.relatedConditions[i], b.relatedConditions[i]))
        return false;
  }
  return true;
}

class Condition {
  name: string = "";
  description: string = "";
}

export function conditionComparer(a: Condition, b: Condition) {
  return a.name == b.name && a.description == b.description;
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
