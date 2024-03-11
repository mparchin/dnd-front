import { memo, useMemo } from "react";
import {
  useThemeStore,
  ThemeMode,
  usePrimaryColor,
  usePrimaryColorString,
} from "../../theme";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface ExtrasBoxProps {
  name: string;
  total: number;
  used: number;
  editMode: boolean;
  canEdit: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onClick: () => void;
}

export const ExtrasBox = memo((props: ExtrasBoxProps) => {
  const themeStore = useThemeStore();
  const primaryColor = usePrimaryColor();
  const primaryColorString = usePrimaryColorString();
  const bgImage = useMemo(
    () => ({
      backgroundImage: `url('/extra-box-bg-${
        themeStore.mode == ThemeMode.light ? "grey" : "white"
      }.svg')`,
    }),
    [themeStore.mode]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <div
      className="flex flex-col bg-no-repeat w-44 m-1"
      onClick={props.onClick}
      style={bgImage}
    >
      <div className="w-full h-24 flex flex-row pl-1">
        <div className="h-full w-20 ml-1 mr-1 text-center flex flex-col">
          {props.canEdit && props.editMode ? (
            <div className="flex flex-col grow">
              <div className="grow"></div>
              <IconButton onClick={props.onDeleteClick}>
                <Delete color="error" className="grow text-4xl" />
              </IconButton>
              <div className="grow"></div>
            </div>
          ) : (
            <>
              <div className="grow flex flex-col pt-3">
                <span className="grow"></span>
                <span className="grow text-4xl font-bold" style={coloredStyle}>
                  {props.total}
                </span>
                <span className="grow"></span>
              </div>
              <span className="shrink uppercase text-xxs pb-3">total</span>
            </>
          )}
        </div>
        <div className="h-full w-20 ml-1 mr-1 text-center flex flex-col">
          {props.canEdit && props.editMode ? (
            <div className="flex flex-col grow">
              <div className="grow"></div>
              <IconButton onClick={props.onEditClick}>
                <Edit color={primaryColorString} className="grow text-4xl" />
              </IconButton>
              <div className="grow"></div>
            </div>
          ) : (
            <>
              <div className="grow flex flex-col pt-3">
                <span className="grow"></span>
                <span className="grow text-4xl font-bold" style={coloredStyle}>
                  {props.used}
                </span>
                <span className="grow"></span>
              </div>
              <span className="shrink uppercase text-xxs pb-3">used</span>
            </>
          )}
        </div>
      </div>
      <div className="w-full h-6 flex flex-col text-center text-sm uppercase">
        <span className="grow"></span>
        <span className="pb-1">{props.name}</span>
      </div>
    </div>
  );
});
