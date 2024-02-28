import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useBgColor, usePrimaryColor } from "../theme";
import { DescreteSlider } from "./Controls/DescreteSlider";
import { ExpertEdit } from "./Characters/Edit/ExpertEdit";
import { ExtraField } from "./Controls/ExtraField";
import { ComboBox } from "./Controls/ComboBox";
import { DialogAppBar } from "./Characters/Edit/DialogAppBar";
import { EditTextField } from "./Characters/Edit/EditTextField";
import { HPEdit } from "./Characters/Edit/HPEdit";
import { SpellCastingEdit } from "./Characters/Edit/SpellCastingEdit";

export interface CharacterEditDialogState {
  isOpen: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
  };
  editName: string;
  setName: (str: string) => void;
}

export const useCharacterEditDialogStore = create<CharacterEditDialogState>()(
  (set) => ({
    isOpen: false,
    dialogActions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    },
    editName: "",
    setName: (str: string) => set({ editName: str }),
  })
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
  const comboOptions = useMemo(() => [{ value: 1, text: "test" }], []);
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
          value={state.editName}
          onChange={state.setName}
        />

        <EditTextField label="Race" />

        <EditTextField label="Background" />

        <div className="w-88 m-2 text-center">TODO image</div>

        <ComboBox
          className="w-88 m-2"
          required
          lable="class"
          options={comboOptions}
        />

        <ComboBox
          className="w-88 m-2"
          lable="Subclass"
          options={comboOptions}
        />

        <DescreteSlider className="w-88 m-2" label="Level" />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <DescreteSlider
          className="w-88 m-2"
          label="Strength"
          defaultValue={10}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Dextrity"
          defaultValue={10}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Constitution"
          defaultValue={10}
        />
        <DescreteSlider
          className="w-88 m-2"
          label="Intelligence"
          defaultValue={10}
        />
        <DescreteSlider className="w-88 m-2" label="Wisdom" defaultValue={10} />
        <DescreteSlider
          className="w-88 m-2"
          label="Charisma"
          defaultValue={10}
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <EditTextField label="Speed" type="number" />

        <ExpertEdit
          className="w-88 m-2"
          name="inititive"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />

        <ExtraField className="w-88 m-2" label="Armor Class" required />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <HPEdit />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <SpellCastingEdit />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <ExpertEdit
          className="w-88 m-2"
          name="strength"
          mainAttributeName="STR"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />
        <ExpertEdit
          className="w-88 m-2"
          name="dextrity"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />
        <ExpertEdit
          className="w-88 m-2"
          name="constitution"
          mainAttributeName="CON"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />
        <ExpertEdit
          className="w-88 m-2"
          name="intelligence"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />
        <ExpertEdit
          className="w-88 m-2"
          name="wisdom"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />
        <ExpertEdit
          className="w-88 m-2"
          name="charisma"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
          disableExpertOption
        />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <ExpertEdit
          className="w-88 m-2"
          name="athletics"
          mainAttributeName="STR"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="acrobatics"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="sleight of hand"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="stealth"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="arcana"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="history"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="investigation"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="nature"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="religion"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="animal handling"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="insight"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="medicine"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="perception"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="survival"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="deception"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="intimidation"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="performance"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="persuasion"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
      </div>
    </Dialog>
  );
}
