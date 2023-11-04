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

  isEqualTo(spell: Spell) {
    if (
      this.id != spell.id ||
      this.level != spell.level ||
      this.name != spell.name ||
      this.book != spell.book ||
      this.schoolName != spell.schoolName ||
      this.spellListName != spell.spellListName ||
      this.hasVerbalComponent != spell.hasVerbalComponent ||
      this.hasSomaticComponent != spell.hasSomaticComponent ||
      this.hasMaterialComponent != spell.hasMaterialComponent ||
      this.materials != spell.materials ||
      this.savingThrow != spell.savingThrow ||
      this.damageTypes != spell.damageTypes ||
      this.action != spell.action ||
      this.longerAction != spell.longerAction ||
      this.range != spell.range ||
      this.duration != spell.duration ||
      this.isConcentration != spell.isConcentration ||
      this.isRitual != spell.isRitual ||
      this.description != spell.description ||
      this.higherLevelDescription != spell.higherLevelDescription ||
      this.damageFormula != spell.damageFormula
    )
      return false;
    if (
      this.spellTags?.length != spell.spellTags?.length ||
      this.restrictedClasses?.length != spell.restrictedClasses?.length ||
      this.relatedConditions?.length != spell.relatedConditions?.length
    )
      return false;

    if (
      (this.spellTags?.filter((tag) => !spell.spellTags?.includes(tag))
        .length ?? 0) > 0 ||
      (spell.spellTags?.filter((tag) => !this.spellTags?.includes(tag))
        .length ?? 0) > 0
    )
      return false;

    if (
      (this.restrictedClasses?.filter(
        (cls) => !spell.restrictedClasses?.includes(cls)
      ).length ?? 0) > 0 ||
      (spell.restrictedClasses?.filter(
        (cls) => !this.restrictedClasses?.includes(cls)
      ).length ?? 0) > 0
    )
      return false;

    for (let i = 0; i < (this.relatedConditions?.length ?? 0); i++) {
      if (this.relatedConditions && spell.relatedConditions)
        if (!this.relatedConditions[i].isEqualsTo(spell.relatedConditions[i]))
          return false;
    }
    return true;
  }
}

class Condition {
  name: string = "";
  description: string = "";

  isEqualsTo(condition: Condition) {
    return (
      this.name == condition.name && this.description == condition.description
    );
  }
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
