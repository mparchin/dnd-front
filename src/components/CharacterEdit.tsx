import { Check, Close } from "@mui/icons-material";
import {
  AppBar,
  Card,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useBgColor, usePrimaryColor, usePrimaryColorString } from "../theme";
import { DescreteSlider } from "./Controls/DescreteSlider";
import ExpertEdit from "./Characters/ExpertEdit";
import { ExtraField } from "./Controls/ExtraField";
import { ComboBox } from "./Controls/ComboBox";

export interface CharacterEditDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  editName: string;
  setName: (str: string) => void;
}

export const useCharacterEditDialogStore = create<CharacterEditDialogState>()(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
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
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  const primaryString = usePrimaryColorString();
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
  const centerTextStyle = {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  };
  useEffect(() => {
    if (!state.isOpen && IsOpenRequest()) state.open();
    else if (state.isOpen && !IsOpenRequest()) state.close();
  }, [state.isOpen, location.pathname]);
  return (
    <Dialog
      fullScreen
      open={state.isOpen}
      onClose={CloseRequest}
      TransitionComponent={Transition}
    >
      <AppBar className="relative" color={primaryString}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={CloseRequest}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <div className="grow"></div>
          <IconButton
            autoFocus
            color="inherit"
            onClick={CloseRequest}
            aria-label="save"
          >
            <Check />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        className="w-full overflow-auto flex flex-row flex-wrap p-2 justify-center"
        style={bgColorStyle}
      >
        <TextField
          label="Name"
          className="w-88 m-2"
          color={primaryString}
          required
          value={state.editName}
          onChange={(e) => state.setName(e.target.value)}
        />

        <TextField
          label="Race"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <TextField
          label="Background"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <div className="w-88 m-2 text-center">TODO image</div>

        <ComboBox
          className="w-88 m-2"
          required
          lable="class"
          options={[{ value: 1, text: "test" }]}
        />

        <ComboBox
          className="w-88 m-2"
          lable="Subclass"
          options={[{ value: 1, text: "test" }]}
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

        <TextField
          label="Speed"
          className="w-88 m-2"
          color={primaryString}
          required
          type="number"
        />

        <ExpertEdit
          className="w-88 m-2"
          name="inititive"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />

        <ExtraField className="w-88 m-2" label="Armor Class" required />

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>

        <div className="flex flex-row w-88 m-2">
          <Card
            className="capitalize flex flex-col text-vertical-lr text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
            elevation={3}
          >
            HP
          </Card>
          <div className="mr-2 flex flex-col grow-[4] basis-0">
            <span className="capitalize text-center mb-2">average</span>
            <div className="flex flex-row flex-wrap">
              <div className="mr-1 w-14 mb-1">
                <TextField
                  className="text-center"
                  label="H-Die"
                  color={primaryString}
                  disabled
                  value={3}
                  sx={centerTextStyle}
                />
              </div>
              <div className="flex flex-col mr-1 mb-1">
                <div className="grow"></div>
                <span>+</span>
                <div className="grow"></div>
              </div>
              <div className="mr-1 w-14 mb-1">
                <TextField
                  className="text-center"
                  label="CON"
                  color={primaryString}
                  disabled
                  value={3}
                  sx={centerTextStyle}
                />
              </div>
              <div className="flex flex-col mr-1 mb-1">
                <div className="grow"></div>
                <span>+</span>
                <div className="grow"></div>
              </div>
              <ExtraField className="w-full mb-1" />
            </div>
            <div className="grow"></div>
          </div>
          <div className="w-0.5 mr-2 shrink-0" style={dividerColor}></div>
          <div className="flex flex-col grow-[3] basis-0">
            <span className="capitalize text-center mb-2">custom</span>
            <div>
              <TextField
                label="Maximum HP"
                color={primaryString}
                type="number"
              />
            </div>
            <div className="grow"></div>
          </div>
        </div>

        <div className="h-0.5 w-screen mt-4 mb-4" style={dividerColor}></div>
        <ComboBox
          className="w-88 m-2"
          lable="spell casting ability"
          options={[
            { value: 1, text: "strength" },
            { value: 2, text: "dextrity" },
            { value: 3, text: "constitution" },
            { value: 4, text: "intelligence" },
            { value: 5, text: "wisdom" },
            { value: 6, text: "charisma" },
          ]}
        />
        <div className="flex flex-row w-88 m-2">
          <Card
            className="capitalize flex flex-col text-vertical-lr text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
            elevation={3}
          >
            Spell attack
          </Card>
          <div className="flex flex-row flex-wrap grow basis-0">
            <div className="mr-1 w-14 mb-1">
              <TextField
                className="text-center"
                label="Prof"
                color={primaryString}
                disabled
                value="d4"
                sx={centerTextStyle}
              />
            </div>
            <div className="flex flex-col mr-1 mb-1">
              <div className="grow"></div>
              <span>+</span>
              <div className="grow"></div>
            </div>
            <div className="mr-1 w-14 mb-1">
              <TextField
                className="text-center"
                label="CON"
                color={primaryString}
                disabled
                value={3}
                sx={centerTextStyle}
              />
            </div>
            <div className="flex flex-col mr-1 mb-1">
              <div className="grow"></div>
              <span>+</span>
              <div className="grow"></div>
            </div>
            <ExtraField className="w-full mb-1" />
          </div>
        </div>

        <div className="flex flex-row w-88 m-2">
          <Card
            className="capitalize flex text-vertical-lr flex-col text-center p-1 pr-2 pt-4 pb-4 mr-2 shrink-0"
            elevation={3}
          >
            Spell Save DC
          </Card>
          <div className="flex flex-row flex-wrap grow basis-0">
            <div className="mr-1 w-14 mb-1">
              <TextField
                className="text-center"
                label=""
                color={primaryString}
                disabled
                value={8}
                sx={centerTextStyle}
              />
            </div>
            <div className="flex flex-col mr-1 mb-1">
              <div className="grow"></div>
              <span>+</span>
              <div className="grow"></div>
            </div>
            <div className="mr-1 w-14 mb-1">
              <TextField
                className="text-center"
                label="Prof"
                color={primaryString}
                disabled
                value={2}
                sx={centerTextStyle}
              />
            </div>
            <div className="flex flex-col mr-1 mb-1">
              <div className="grow"></div>
              <span>+</span>
              <div className="grow"></div>
            </div>
            <div className="mr-1 w-14 mb-1">
              <TextField
                className="text-center"
                label="CON"
                color={primaryString}
                disabled
                value={3}
                sx={centerTextStyle}
              />
            </div>
            <div className="flex flex-col mr-1 mb-1">
              <div className="grow"></div>
              <span>+</span>
              <div className="grow"></div>
            </div>
            <ExtraField className="w-full mb-1" />
          </div>
        </div>
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
