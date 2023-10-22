export interface Spell {
  id: number;
  level: number;
  name: string;
  book?: string;
  schoolName?: string;
  spellListName: string;
  hasVerbalComponent: boolean;
  hasSomaticComponent: boolean;
  hasMaterialComponent: boolean;
  materials?: string;
  spellTags?: string[];
  savingThrow?: string;
  damageType?: string;
  action: string;
  longerAction?: string;
  range: string;
  duration: string;
  isConcentration: boolean;
  isRitual: boolean;
  restrictedClasses?: string[];
  description: string;
  higherLevelDescription?: string;
  damageFormula?: string;
  relatedConditions?: string[];
}
