import { useBgColor, usePrimaryColor, usePrimaryColorString } from "../theme";
import { useEffect, useMemo } from "react";
import { useCharacterAPI, useCharacterListStore } from "../API/characters";
import { Virtuoso } from "react-virtuoso";
import { Dndsvg } from "../assets/dndsvg";
import {
  Avatar,
  CircularProgress,
  Fab,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, ArrowForwardIos, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

export interface CharacterListPageState {
  showDeleteOptions: boolean;
  setShowDeleteOptions: (flag: boolean) => void;
  showProgressId: number;
  setShowProgress: (val: number) => void;
}

export const useCharacterListPageStore = create<CharacterListPageState>()(
  (set) => ({
    showDeleteOptions: false,
    setShowDeleteOptions: (flag) => set({ showDeleteOptions: flag }),
    showProgressId: 0,
    setShowProgress: (val) => set({ showProgressId: val }),
  })
);

export default function () {
  const primaryColor = usePrimaryColor();
  const primarycolorString = usePrimaryColorString();
  const theme = useTheme();
  const characterListState = useCharacterListStore((state) => state);
  const pageState = useCharacterListPageStore((state) => state);
  const characterAPI = useCharacterAPI();
  const navigate = useNavigate();
  const bgColor = useBgColor();
  const bgColorStyle = useMemo(
    () => ({
      backgroundColor: bgColor,
    }),
    [bgColor]
  );
  const dividerStyle = useMemo(() => ({ backgroundColor: primaryColor.main }), [
    primaryColor,
  ]);
  const iconStyle = useMemo(
    () => ({ color: theme.palette.background.default }),
    [theme.palette.mode]
  );
  const coloredStyle = useMemo(() => ({ color: primaryColor.main }), [
    primaryColor,
  ]);

  useEffect(() => {
    characterAPI.getAll();
  }, []);

  return (
    <>
      <div className="w-full h-full" style={bgColorStyle}>
        <Virtuoso
          className="overflow-auto box-border w-full h-full"
          data={characterListState.characters}
          itemContent={(index, character) => {
            return (
              <>
                <div
                  className="p-2 flex flex-row w-full"
                  onClick={() =>
                    navigate("/characterView", {
                      state: { charId: character.id },
                    })
                  }
                >
                  <Avatar
                    className="w-20 h-20 mt-1 border-2 border-current rounded-lg"
                    src="/asghar.jpg"
                    variant="rounded"
                    style={coloredStyle}
                  />
                  <div className="flex flex-col grow pl-4 pt-2">
                    <span className="grow capitalize">{character.name}</span>
                    <span className="grow capitalize">{character.race}</span>
                    <span className="grow capitalize">
                      {character.class.name}({character.level})
                    </span>
                  </div>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    className="block ml-1"
                    onClick={(e) => {
                      if (pageState.showDeleteOptions) {
                        e.stopPropagation();
                        characterAPI.delete(character.id, (flag) =>
                          pageState.setShowProgress(flag ? character.id : 0)
                        );
                      }
                    }}
                  >
                    {pageState.showDeleteOptions &&
                    pageState.showProgressId != character.id ? (
                      <Delete color={primarycolorString} />
                    ) : pageState.showDeleteOptions &&
                      pageState.showProgressId == character.id ? (
                      <CircularProgress color={primarycolorString} />
                    ) : (
                      <ArrowForwardIos color={primarycolorString} />
                    )}
                  </IconButton>
                </div>

                <div className="w-full h-0.5" style={dividerStyle}></div>

                {index == characterListState.characters.length - 1 ? (
                  <Dndsvg color={primaryColor.main} background={bgColor} />
                ) : (
                  <></>
                )}
              </>
            );
          }}
        />
      </div>
      <Fab
        className="fixed bottom-8 right-8"
        onClick={() => navigate("/characterEdit", { state: { charId: 0 } })}
        style={dividerStyle}
      >
        <Add style={iconStyle} />
      </Fab>
    </>
  );
}
