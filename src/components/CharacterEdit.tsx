import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useCallback, useEffect, useMemo } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useBgColor, usePrimaryColor } from "../theme";
import { DescreteSlider } from "./Controls/DescreteSlider";
import { ExpertEdit, ExpertEditState } from "./Characters/Edit/ExpertEdit";
import { ExtraField } from "./Controls/ExtraField";
import { ComboBox } from "./Controls/ComboBox";
import { DialogAppBar } from "./Characters/Edit/DialogAppBar";
import { EditTextField } from "./Characters/Edit/EditTextField";
import { HPEdit } from "./Characters/Edit/HPEdit";
import { SpellCastingEdit } from "./Characters/Edit/SpellCastingEdit";
import { useClassListStore } from "../API/classes";
import { useFeatureListStore } from "../API/feature";
import { immer } from "zustand/middleware/immer";
import { immerable } from "immer";
import {
  CharacterAPI,
  CharactersListState,
  useCharacterAPI,
  useCharacterListStore,
} from "../API/characters";
import { Class } from "../models/spell";
import { CharacterExpert } from "../models/Character/CharacterExpert";
import { CharacterAttributes } from "../models/Character/CharacterAttributes";
import { Character } from "../models/Character/Character";
import { CalculateProficiencyBonous } from "../models/extraCalculations";

class ExpertEditClass implements ExpertEditState {
  [immerable] = true;
  hasAdvantage: boolean;
  isProficient: boolean;
  isExpert: boolean;
  extra: string;
  actions: {
    setAdvantage: (flag: boolean) => void;
    setProficient: (flag: boolean) => void;
    setExpert: (flag: boolean) => void;
    setExtra: (str: string) => void;
  };
  constructor(
    set: (
      nextStateOrUpdater:
        | CharacterEditDialogState
        | Partial<CharacterEditDialogState>
        // @ts-ignore
        | ((state: WritableDraft<CharacterEditDialogState>) => void),
      shouldReplace?: boolean | undefined
    ) => void,
    selector: (
      // @ts-ignore
      state: WritableDraft<CharacterEditDialogState>
      // @ts-ignore
    ) => WritableDraft<ExpertEditState>
  ) {
    this.hasAdvantage = false;
    this.isProficient = false;
    this.isExpert = false;
    this.extra = "";
    this.actions = {
      setAdvantage: (flag: boolean) => {
        set((state) => {
          selector(state).hasAdvantage = flag;
        });
      },
      setProficient: (flag: boolean) => {
        set((state) => {
          selector(state).isProficient = flag;
        });
      },
      setExpert: (flag: boolean) => {
        set((state) => {
          selector(state).isExpert = flag;
        });
      },
      setExtra: (str: string) => {
        set((state) => {
          selector(state).extra = str;
        });
      },
    };
  }
}

export interface CharacterEditDialogState {
  id: number;
  isOpen: boolean;
  showProgress: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
    setShowProgress: (flag: boolean) => void;
  };
  name: string;
  race: string;
  background: string;
  classId: string;
  subclassName?: string;
  level: number;
  strength: number;
  dextrity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  speed: string;
  inititive: ExpertEditState;
  armourClassExtra: string;
  HPExtra: string;
  customHP: string;
  castingAbility: string;
  spellAttackExtra: string;
  spellSaveExtra: string;

  strengthSave: ExpertEditState;
  dextritySave: ExpertEditState;
  constitutionSave: ExpertEditState;
  intelligenceSave: ExpertEditState;
  wisdomSave: ExpertEditState;
  charismaSave: ExpertEditState;

  athletics: ExpertEditState;
  acrobatics: ExpertEditState;
  sleightOfHands: ExpertEditState;
  stealth: ExpertEditState;
  arcana: ExpertEditState;
  history: ExpertEditState;
  investigation: ExpertEditState;
  nature: ExpertEditState;
  religion: ExpertEditState;
  animalHandling: ExpertEditState;
  insight: ExpertEditState;
  medicine: ExpertEditState;
  perception: ExpertEditState;
  survival: ExpertEditState;
  deception: ExpertEditState;
  intimidation: ExpertEditState;
  performance: ExpertEditState;
  persuasion: ExpertEditState;

  actions: {
    setId: (val: number) => void;
    setName: (str: string) => void;
    setRace: (str: string) => void;
    setBackground: (str: string) => void;
    setClassId: (str: string) => void;
    setSubclassName: (str?: string) => void;
    setLevel: (val: number) => void;
    setStrength: (val: number) => void;
    setDextrity: (val: number) => void;
    setConstitution: (val: number) => void;
    setIntelligence: (val: number) => void;
    setWisdom: (val: number) => void;
    setCharisma: (val: number) => void;
    setSpeed: (str: string) => void;
    setArmourClassExtra: (str: string) => void;
    setHPExtra: (str: string) => void;
    setCustomHp: (str: string) => void;
    setCastingAbility: (str: string) => void;
    setSpellAttackExtra: (str: string) => void;
    setSpellSaveExtra: (str: string) => void;
  };
}

export const useCharacterEditDialogStore = create<CharacterEditDialogState>()(
  immer((set) => ({
    [immerable]: true,
    id: 0,
    showProgress: false,
    isOpen: false,
    dialogActions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setShowProgress: (flag) => set({ showProgress: flag }),
    },
    name: "",
    race: "",
    background: "",
    classId: "",
    subclassName: undefined,
    level: 1,
    strength: 10,
    dextrity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    speed: "30",
    inititive: new ExpertEditClass(set, (state) => state.inititive),
    armourClassExtra: "",
    HPExtra: "",
    customHP: "",
    castingAbility: "",
    spellAttackExtra: "",
    spellSaveExtra: "",

    strengthSave: new ExpertEditClass(set, (state) => state.strengthSave),
    dextritySave: new ExpertEditClass(set, (state) => state.dextritySave),
    constitutionSave: new ExpertEditClass(
      set,
      (state) => state.constitutionSave
    ),
    intelligenceSave: new ExpertEditClass(
      set,
      (state) => state.intelligenceSave
    ),
    wisdomSave: new ExpertEditClass(set, (state) => state.wisdomSave),
    charismaSave: new ExpertEditClass(set, (state) => state.charismaSave),

    athletics: new ExpertEditClass(set, (state) => state.athletics),
    acrobatics: new ExpertEditClass(set, (state) => state.acrobatics),
    sleightOfHands: new ExpertEditClass(set, (state) => state.sleightOfHands),
    stealth: new ExpertEditClass(set, (state) => state.stealth),
    arcana: new ExpertEditClass(set, (state) => state.arcana),
    history: new ExpertEditClass(set, (state) => state.history),
    investigation: new ExpertEditClass(set, (state) => state.investigation),
    nature: new ExpertEditClass(set, (state) => state.nature),
    religion: new ExpertEditClass(set, (state) => state.religion),
    animalHandling: new ExpertEditClass(set, (state) => state.animalHandling),
    insight: new ExpertEditClass(set, (state) => state.insight),
    medicine: new ExpertEditClass(set, (state) => state.medicine),
    perception: new ExpertEditClass(set, (state) => state.perception),
    survival: new ExpertEditClass(set, (state) => state.survival),
    deception: new ExpertEditClass(set, (state) => state.deception),
    intimidation: new ExpertEditClass(set, (state) => state.intimidation),
    performance: new ExpertEditClass(set, (state) => state.performance),
    persuasion: new ExpertEditClass(set, (state) => state.persuasion),

    actions: {
      setId: (val: number) => set({ id: val }),
      setName: (str: string) => set({ name: str }),
      setRace: (str: string) => set({ race: str }),
      setBackground: (str: string) => set({ background: str }),
      setClassId: (str: string) => set({ classId: str }),
      setSubclassName: (str?: string) => set({ subclassName: str }),
      setLevel: (val: number) => set({ level: val }),
      setStrength: (val: number) => set({ strength: val }),
      setDextrity: (val: number) => set({ dextrity: val }),
      setConstitution: (val: number) => set({ constitution: val }),
      setIntelligence: (val: number) => set({ intelligence: val }),
      setWisdom: (val: number) => set({ wisdom: val }),
      setCharisma: (val: number) => set({ charisma: val }),
      setSpeed: (str: string) => set({ speed: str }),
      setArmourClassExtra: (str: string) => set({ armourClassExtra: str }),
      setHPExtra: (str: string) => set({ HPExtra: str }),
      setCustomHp: (str: string) => set({ customHP: str }),
      setCastingAbility: (str: string) => set({ castingAbility: str }),
      setSpellAttackExtra: (str: string) => set({ spellAttackExtra: str }),
      setSpellSaveExtra: (str: string) => set({ spellSaveExtra: str }),
    },
  }))
);

function SaveExperts(char: CharacterExpert, edit: ExpertEditState) {
  char.hasAdvantage = edit.hasAdvantage;
  char.isExpert = edit.isExpert;
  char.isProficient = edit.isProficient;
  char.extraText = edit.extra;
}

function Save(
  state: CharacterEditDialogState,
  charactersStore: CharactersListState,
  selectedClass: Class,
  api: CharacterAPI
) {
  state.dialogActions.setShowProgress(true);
  const character =
    charactersStore.characters.find((c) => c.id == state.id) ?? new Character();

  character.name = state.name;
  character.race = state.race;
  character.background = state.background;
  character.class = selectedClass;
  character.subClassName = state.subclassName ?? "";
  character.level = state.level;
  character.attributes = new CharacterAttributes(
    state.strength,
    state.dextrity,
    state.constitution,
    state.intelligence,
    state.wisdom,
    state.charisma
  );
  character.speed = Number(state.speed);
  SaveExperts(character.inititive, state.inititive);
  character.armorClassExtra = state.armourClassExtra;
  character.hp.averageMaximumExtra = state.HPExtra;
  character.hp.customMaximum = Number(state.customHP);
  character.spellCasting.castingAbility = state.castingAbility;
  character.spellCasting.attackExtra = state.spellAttackExtra;
  character.spellCasting.dcExtra = state.spellSaveExtra;

  SaveExperts(character.strengthSave, state.strengthSave);
  SaveExperts(character.dextritySave, state.dextritySave);
  SaveExperts(character.constitutionSave, state.constitutionSave);
  SaveExperts(character.intelligenceSave, state.intelligenceSave);
  SaveExperts(character.wisdomSave, state.wisdomSave);
  SaveExperts(character.charismaSave, state.charismaSave);

  SaveExperts(character.athletics, state.athletics);
  SaveExperts(character.acrobatics, state.acrobatics);
  SaveExperts(character.sleightOfHands, state.sleightOfHands);
  SaveExperts(character.stealth, state.stealth);
  SaveExperts(character.arcana, state.arcana);
  SaveExperts(character.history, state.history);
  SaveExperts(character.investigation, state.investigation);
  SaveExperts(character.nature, state.nature);
  SaveExperts(character.religion, state.religion);
  SaveExperts(character.animalHandling, state.animalHandling);
  SaveExperts(character.insight, state.insight);
  SaveExperts(character.medicine, state.medicine);
  SaveExperts(character.perception, state.perception);
  SaveExperts(character.survival, state.survival);
  SaveExperts(character.deception, state.deception);
  SaveExperts(character.intimidation, state.intimidation);
  SaveExperts(character.performance, state.performance);
  SaveExperts(character.persuasion, state.persuasion);

  if (character.id == 0)
    api.create(character, state.dialogActions.setShowProgress);
  else api.update(character, state.dialogActions.setShowProgress);
}

function LoadExperts(edit: ExpertEditState, char: CharacterExpert) {
  edit.actions.setAdvantage(char.hasAdvantage);
  edit.actions.setExpert(char.isExpert);
  edit.actions.setProficient(char.isProficient);
  edit.actions.setExtra(char.extraText);
}

function Load(
  state: CharacterEditDialogState,
  charactersStore: CharactersListState,
  location: Location<any>
) {
  const character =
    charactersStore.characters.find(
      (c) => c.id == (location.state?.charId ?? 0)
    ) ?? new Character();

  state.actions.setId(character.id);
  state.actions.setName(character.name);
  state.actions.setRace(character.race);
  state.actions.setBackground(character.background);
  state.actions.setClassId(character.class.id.toString());
  state.actions.setSubclassName(character.subClassName);
  state.actions.setLevel(character.level);
  state.actions.setStrength(character.attributes.strength);
  state.actions.setDextrity(character.attributes.dextrity);
  state.actions.setConstitution(character.attributes.constitution);
  state.actions.setIntelligence(character.attributes.intelligence);
  state.actions.setWisdom(character.attributes.wisdom);
  state.actions.setCharisma(character.attributes.charisma);
  state.actions.setSpeed(character.speed.toString());
  LoadExperts(state.inititive, character.inititive);
  state.actions.setArmourClassExtra(character.armorClassExtra);
  state.actions.setHPExtra(character.hp.averageMaximumExtra);
  state.actions.setCustomHp(character.hp.customMaximum?.toString() ?? "");
  state.actions.setCastingAbility(character.spellCasting.castingAbility);
  state.actions.setSpellAttackExtra(character.spellCasting.attackExtra);
  state.actions.setSpellSaveExtra(character.spellCasting.dcExtra);
  LoadExperts(state.strengthSave, character.strengthSave);
  LoadExperts(state.dextritySave, character.dextritySave);
  LoadExperts(state.constitutionSave, character.constitutionSave);
  LoadExperts(state.intelligenceSave, character.intelligenceSave);
  LoadExperts(state.wisdomSave, character.wisdomSave);
  LoadExperts(state.charismaSave, character.charismaSave);

  LoadExperts(state.athletics, character.athletics);
  LoadExperts(state.acrobatics, character.acrobatics);
  LoadExperts(state.sleightOfHands, character.sleightOfHands);
  LoadExperts(state.stealth, character.stealth);
  LoadExperts(state.arcana, character.arcana);
  LoadExperts(state.history, character.history);
  LoadExperts(state.investigation, character.investigation);
  LoadExperts(state.nature, character.nature);
  LoadExperts(state.religion, character.religion);
  LoadExperts(state.animalHandling, character.animalHandling);
  LoadExperts(state.insight, character.insight);
  LoadExperts(state.medicine, character.medicine);
  LoadExperts(state.perception, character.perception);
  LoadExperts(state.survival, character.survival);
  LoadExperts(state.deception, character.deception);
  LoadExperts(state.intimidation, character.intimidation);
  LoadExperts(state.performance, character.performance);
  LoadExperts(state.persuasion, character.persuasion);
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function () {
  const state = useCharacterEditDialogStore((state) => state);
  const characterAPI = useCharacterAPI();
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () => location.pathname.includes("characterEdit");
  const CloseRequest = useCallback(() => {
    if (IsOpenRequest()) navigate(-1);
  }, [location.pathname]);
  const charactersStore = useCharacterListStore((state) => state);
  const classes = useClassListStore((state) => state.classes);
  const classesComboOptions = useMemo(
    () =>
      classes.map((entity) => ({
        value: entity.id.toString(),
        text: entity.name,
      })),
    [classes]
  );
  const selectedClass = useMemo(
    () =>
      classes.find((entity) => entity.id.toString() == state.classId) ??
      classes[0] ??
      new Class(),
    [state.classId, classes]
  );
  const subClasses = useFeatureListStore((state) => state.subclasses);
  const subClassesComboOptions = useMemo(() => {
    return subClasses
      .filter((entity) => entity.className == selectedClass?.name)
      .map((entity) => ({ value: entity.name, text: entity.name }));
  }, [selectedClass, subClasses]);
  const proficiencyBonous = useMemo(
    () =>
      CalculateProficiencyBonous(
        selectedClass?.proficiencyBonous ?? "((Level-1)/4)+2",
        state.level ?? 1
      ),
    [selectedClass, state.level]
  );
  const castingAbilityValue = useMemo(
    () =>
      state.castingAbility == "str"
        ? state.strength
        : state.castingAbility == "dex"
        ? state.dextrity
        : state.castingAbility == "con"
        ? state.constitution
        : state.castingAbility == "int"
        ? state.intelligence
        : state.castingAbility == "wis"
        ? state.wisdom
        : state.castingAbility == "cha"
        ? state.charisma
        : undefined,
    [
      state.castingAbility,
      state.strength,
      state.dextrity,
      state.constitution,
      state.intelligence,
      state.wisdom,
      state.charisma,
    ]
  );
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );
  const dividerColor = useMemo(
    () => ({
      backgroundColor: primaryColor.main,
    }),
    [primaryColor]
  );
  const saveFunction = useCallback(
    () => Save(state, charactersStore, selectedClass, characterAPI),
    [state.id, selectedClass, state]
  );
  useEffect(() => {
    if (!state.isOpen && IsOpenRequest()) state.dialogActions.open();
    else if (state.isOpen && !IsOpenRequest()) state.dialogActions.close();
  }, [state.isOpen, location.pathname]);
  useEffect(() => Load(state, charactersStore, location), [
    state.id,
    state.isOpen,
    location,
  ]);
  return (
    <Dialog
      fullScreen
      open={state.isOpen}
      onClose={CloseRequest}
      TransitionComponent={Transition}
    >
      <DialogAppBar
        closeRequest={CloseRequest}
        Save={saveFunction}
        showProgress={state.showProgress}
      />
      <div
        className="w-full overflow-auto flex flex-row flex-wrap p-2 justify-center"
        style={bgColorStyle}
      >
        <EditTextField
          label="Name"
          value={state.name}
          onChange={state.actions.setName}
        />

        <EditTextField
          label="Race"
          value={state.race}
          onChange={state.actions.setRace}
        />

        <EditTextField
          label="Background"
          value={state.background}
          onChange={state.actions.setBackground}
        />

        <div className="w-88 m-2 text-center">TODO image</div>

        <ComboBox
          className="w-88 m-2"
          required
          lable="class"
          options={classesComboOptions}
          value={selectedClass?.id?.toString()}
          onChange={state.actions.setClassId}
        />

        <ComboBox
          className="w-88 m-2"
          lable="Subclass"
          options={subClassesComboOptions}
          value={state.subclassName}
          onChange={state.actions.setSubclassName}
        />

        <DescreteSlider
          className="w-88 m-2"
          label="Level"
          value={state.level}
          onChange={state.actions.setLevel}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <DescreteSlider
          className="w-88 m-2"
          label="Strength"
          value={state.strength}
          onChange={state.actions.setStrength}
          max={30}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Dextrity"
          value={state.dextrity}
          onChange={state.actions.setDextrity}
          max={30}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Constitution"
          value={state.constitution}
          onChange={state.actions.setConstitution}
          max={30}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Intelligence"
          value={state.intelligence}
          onChange={state.actions.setIntelligence}
          max={30}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Wisdom"
          value={state.wisdom}
          onChange={state.actions.setWisdom}
          max={30}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Charisma"
          value={state.charisma}
          onChange={state.actions.setCharisma}
          max={30}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <EditTextField
          label="Speed"
          type="number"
          value={state.speed}
          onChange={state.actions.setSpeed}
        />

        <ExpertEdit
          className="w-88 m-2"
          name="inititive"
          mainAttributeName="DEX"
          mainAttributeValue={state.dextrity}
          proficiencyBonous={proficiencyBonous}
          editState={state.inititive}
        />

        <ExtraField
          className="w-88 m-2"
          label="Armor Class"
          required
          value={state.armourClassExtra}
          onChange={state.actions.setArmourClassExtra}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <HPEdit
          constitution={state.constitution}
          hitDie={selectedClass.hitDie}
          customValue={state.customHP}
          onCustomChange={state.actions.setCustomHp}
          extraValue={state.HPExtra}
          onExtraChange={state.actions.setHPExtra}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <SpellCastingEdit
          profiencyBonous={proficiencyBonous}
          castingAbility={state.castingAbility}
          castingAbilityValue={castingAbilityValue}
          onCastingAbilityChange={state.actions.setCastingAbility}
          spellAttackExtra={state.spellAttackExtra}
          onSpellAttackExtraChange={state.actions.setSpellAttackExtra}
          spellSaveDCExtra={state.spellSaveExtra}
          onSpellSaveDCExtra={state.actions.setSpellSaveExtra}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <ExpertEdit
          className="w-88 m-2"
          name="strength"
          mainAttributeName="STR"
          mainAttributeValue={state.strength}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.strengthSave}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="dextrity"
          mainAttributeName="DEX"
          mainAttributeValue={state.dextrity}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.dextritySave}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="constitution"
          mainAttributeName="CON"
          mainAttributeValue={state.constitution}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.constitutionSave}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="intelligence"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.intelligenceSave}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="wisdom"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.wisdomSave}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="charisma"
          mainAttributeName="CHA"
          mainAttributeValue={state.charisma}
          proficiencyBonous={proficiencyBonous}
          disableExpertOption
          editState={state.charismaSave}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <ExpertEdit
          className="w-88 m-2"
          name="athletics"
          mainAttributeName="STR"
          mainAttributeValue={state.strength}
          proficiencyBonous={proficiencyBonous}
          editState={state.athletics}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="acrobatics"
          mainAttributeName="DEX"
          mainAttributeValue={state.dextrity}
          proficiencyBonous={proficiencyBonous}
          editState={state.acrobatics}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="sleight of hand"
          mainAttributeName="DEX"
          mainAttributeValue={state.dextrity}
          proficiencyBonous={proficiencyBonous}
          editState={state.sleightOfHands}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="stealth"
          mainAttributeName="DEX"
          mainAttributeValue={state.dextrity}
          proficiencyBonous={proficiencyBonous}
          editState={state.stealth}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="arcana"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          editState={state.arcana}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="history"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          editState={state.history}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="investigation"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          editState={state.investigation}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="nature"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          editState={state.nature}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="religion"
          mainAttributeName="INT"
          mainAttributeValue={state.intelligence}
          proficiencyBonous={proficiencyBonous}
          editState={state.religion}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="animal handling"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          editState={state.animalHandling}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="insight"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          editState={state.insight}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="medicine"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          editState={state.medicine}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="perception"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          editState={state.perception}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="survival"
          mainAttributeName="WIS"
          mainAttributeValue={state.wisdom}
          proficiencyBonous={proficiencyBonous}
          editState={state.survival}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="deception"
          mainAttributeName="CHA"
          mainAttributeValue={state.charisma}
          proficiencyBonous={proficiencyBonous}
          editState={state.deception}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="intimidation"
          mainAttributeName="CHA"
          mainAttributeValue={state.charisma}
          proficiencyBonous={proficiencyBonous}
          editState={state.intimidation}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="performance"
          mainAttributeName="CHA"
          mainAttributeValue={state.charisma}
          proficiencyBonous={proficiencyBonous}
          editState={state.performance}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="persuasion"
          mainAttributeName="CHA"
          mainAttributeValue={state.charisma}
          proficiencyBonous={proficiencyBonous}
          editState={state.persuasion}
        />
      </div>
    </Dialog>
  );
}
