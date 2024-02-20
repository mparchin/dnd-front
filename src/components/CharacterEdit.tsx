import { Check, Close } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { getPrimaryColor, getPrimaryString, useThemeStore } from "../theme";
import DescreteSlider from "./Controls/DescreteSlider";
import ExpertEdit from "./Characters/ExpertEdit";

export interface CharacterEditDialogState {
  isOpen: boolean;
  dialogActions: {
    open: () => void;
    close: () => void;
  };
}

export const useCharacterEditDialogStore = create<CharacterEditDialogState>()(
  (set) => ({
    isOpen: false,
    dialogActions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    },
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

const classes = [
  { label: "barb", id: 1 },
  { label: "wizard", id: 2 },
];

export default function () {
  const editStore = useCharacterEditDialogStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const IsOpenRequest = () => location.pathname.includes("characterEdit");
  const CloseRequest = () => {
    if (IsOpenRequest()) navigate(-1);
  };
  const theme = useTheme();
  const themeStore = useThemeStore((state) => state);
  const primaryString = useMemo(() => getPrimaryString(theme, themeStore), [
    theme,
    themeStore,
  ]);
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  useEffect(() => {
    if (!editStore.isOpen && IsOpenRequest()) editStore.dialogActions.open();
    else if (editStore.isOpen && !IsOpenRequest())
      editStore.dialogActions.close();
  }, [editStore.isOpen, location.pathname]);
  return (
    <Dialog
      fullScreen
      open={editStore.isOpen}
      onClose={CloseRequest}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} color={primaryString}>
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
        style={{
          backgroundColor:
            theme.palette.mode == "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        }}
      >
        <TextField
          label="Name"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <TextField
          label="Race"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <div className="w-88 m-2 text-center">TODO image</div>

        <Autocomplete
          className="w-88 m-2"
          disablePortal
          options={classes}
          renderInput={(params) => <TextField {...params} label="Class" />}
        />

        <Autocomplete
          className="w-88 m-2"
          disablePortal
          options={classes}
          renderInput={(params) => <TextField {...params} label="Subclass" />}
        />

        <DescreteSlider className="w-88 m-2" label="Level" />

        <TextField
          label="Speed"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <ExpertEdit
          className="w-88 m-2"
          name="inititive"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />

        <TextField
          label="Armor Class"
          className="w-88 m-2"
          color={primaryString}
          required
        />

        <div
          className="h-0.5 w-screen mt-4 mb-4"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>

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

        <div
          className="h-0.5 w-screen mt-4 mb-4"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>

        <ExpertEdit
          className="w-88 m-2"
          name="strength"
          mainAttributeName="STR"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="dextrity"
          mainAttributeName="DEX"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="constitution"
          mainAttributeName="CON"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="intelligence"
          mainAttributeName="INT"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="wisdom"
          mainAttributeName="WIS"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />
        <ExpertEdit
          className="w-88 m-2"
          name="charisma"
          mainAttributeName="CHA"
          mainAttributeValue={2}
          proficiencyBonous={2}
        />

        <div
          className="h-0.5 w-screen mt-4 mb-4"
          style={{
            backgroundColor: primaryColor.main,
          }}
        ></div>

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
