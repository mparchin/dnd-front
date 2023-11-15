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
  className: string = "";
  subclass?: string = "";
  time: number = 0;
}

export class Subclass {
  name: string = "";
  className: string = "";
  constructor(name: string, className: string) {
    this.name = name;
    this.className = className;
  }
}

export class Feat {
  id: number = 0;
  name: string = "";
  description: string = "";
  level: number = 0;
  prerequisite?: string = "";
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
}
