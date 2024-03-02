import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { calculateProficiencyBonous } from "../models/extraCalculations";
import { immer } from "zustand/middleware/immer";
import { immerable } from "immer";

class ExpertEditClass implements ExpertEditState {
  [immerable] = true;
  hasAdvantage: boolean;
  isProficient: boolean;
  isExpert: boolean;
  attributeValue: number;
  extra: string;
  actions: {
    setAdvantage: (flag: boolean) => void;
    setProficient: (flag: boolean) => void;
    setExpert: (flag: boolean) => void;
    setAttribute: (val: number) => void;
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
    this.attributeValue = 10;
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
      setAttribute: (val: number) => {
        set((state) => {
          selector(state).attributeValue = val;
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
  isOpen: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
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
    isOpen: false,
    dialogActions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
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
    sleightOfHands: new ExpertEditClass(set, (state) => state.slightOfHands),
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
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () => location.pathname.includes("characterEdit");
  const CloseRequest = useCallback(() => {
    if (IsOpenRequest()) navigate(-1);
  }, [location.pathname]);
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
      classes[0],
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
      calculateProficiencyBonous(
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
  useEffect(() => {
    if (!state.isOpen && IsOpenRequest()) state.dialogActions.open();
    else if (state.isOpen && !IsOpenRequest()) state.dialogActions.close();
  }, [state.isOpen, location.pathname]);
  return (
    <Dialog
      fullScreen
      open={state.isOpen}
      onClose={CloseRequest}
      TransitionComponent={Transition}
    >
      <DialogAppBar closeRequest={CloseRequest} />
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
          value={selectedClass.id.toString()}
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
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Dextrity"
          value={state.dextrity}
          onChange={state.actions.setDextrity}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Constitution"
          value={state.constitution}
          onChange={state.actions.setConstitution}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Intelligence"
          value={state.intelligence}
          onChange={state.actions.setIntelligence}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Wisdom"
          value={state.wisdom}
          onChange={state.actions.setWisdom}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Charisma"
          value={state.charisma}
          onChange={state.actions.setCharisma}
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
