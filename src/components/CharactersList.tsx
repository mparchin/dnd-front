import { useBgColor, usePrimaryColor, usePrimaryColorString } from "../theme";
import { memo, useEffect, useMemo } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useAppLoadingState } from "../App";
import { Character } from "../models/Character/Character";

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

interface CharacterListItemProps {
  character: Character;
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
  hideIcons?: boolean;
}

export const CharacterListItem = memo((p: CharacterListItemProps) => {
  const primaryColor = usePrimaryColor();
  const primarycolorString = usePrimaryColorString();
  const pageState = useCharacterListPageStore((state) => state);
  const bgColor = useBgColor();
  const avatarStyle = useMemo(
    () => ({ color: primaryColor.main, backgroundColor: bgColor }),
    [primaryColor]
  );
  const dividerStyle = useMemo(() => ({ backgroundColor: primaryColor.main }), [
    primaryColor,
  ]);

  return (
    <>
      <div
        className="p-2 flex flex-row w-full"
        onClick={() => {
          if (p.onClick) p.onClick(p.character.id);
        }}
      >
        <Avatar
          className="w-20 h-20 mt-1 border-2 border-current rounded-lg"
          src={p.character.image}
          variant="rounded"
          style={avatarStyle}
        />
        <div className="flex flex-col grow pl-4 pt-2">
          <span className="grow capitalize">{p.character.name}</span>
          <span className="grow capitalize">{p.character.race}</span>
          <span className="grow capitalize">
            {p.character.class.name}({p.character.level})
          </span>
        </div>
        {p.hideIcons == true ? (
          <></>
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            className="block ml-1"
            onClick={(e) => {
              if (pageState.showDeleteOptions) {
                e.stopPropagation();
              }
            }}
          >
            {pageState.showDeleteOptions &&
            pageState.showProgressId != p.character.id ? (
              <Delete color={primarycolorString} />
            ) : pageState.showDeleteOptions &&
              pageState.showProgressId == p.character.id ? (
              <CircularProgress color={primarycolorString} />
            ) : (
              <ArrowForwardIos color={primarycolorString} />
            )}
          </IconButton>
        )}
      </div>
      <div className="w-full h-0.5" style={dividerStyle}></div>
    </>
  );
});

export default function () {
  const pageState = useCharacterListPageStore((state) => state);
  const setAppLoadingState = useAppLoadingState((state) => state.setLoading);
  const primaryColor = usePrimaryColor();
  const theme = useTheme();
  const characterListState = useCharacterListStore((state) => state);
  const characterAPI = useCharacterAPI();
  const navigate = useNavigate();
  const bgColor = useBgColor();
  const location = useLocation();
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

  useEffect(() => {
    characterAPI.getAll(setAppLoadingState);
  }, [location.pathname]);

  return (
    <>
      <div className="w-full h-full" style={bgColorStyle}>
        <Virtuoso
          className="overflow-auto box-border w-full h-full"
          data={characterListState.characters}
          itemContent={(index, character) => {
            return (
              <>
                <CharacterListItem
                  key={character.id}
                  character={character}
                  onClick={(id) =>
                    navigate("/characterView", {
                      state: { charId: id },
                    })
                  }
                  onDelete={(id) =>
                    characterAPI.delete(id, (flag) =>
                      pageState.setShowProgress(flag ? id : 0)
                    )
                  }
                />
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
