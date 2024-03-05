import { useBgColor, usePrimaryColor } from "../theme";
import { useMemo } from "react";
import { useCharacterListStore } from "../API/characters";
import { Virtuoso } from "react-virtuoso";
import { Dndsvg } from "../assets/dndsvg";
import { Avatar, Fab, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function () {
  const primaryColor = usePrimaryColor();
  const theme = useTheme();
  const characters = useCharacterListStore((state) => state.characters);
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

  return (
    <>
      <div className="w-full h-full" style={bgColorStyle}>
        <Virtuoso
          className="overflow-auto box-border w-full h-full"
          data={characters}
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
                  <div className="flex flex-col w-28 pl-4 pt-2">
                    <span className="grow capitalize">{character.name}</span>
                    <span className="grow capitalize">{character.race}</span>
                    <span className="grow capitalize">
                      {character.class.name}({character.level})
                    </span>
                  </div>
                </div>

                <div className="w-full h-0.5" style={dividerStyle}></div>

                {index == characters.length - 1 ? (
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
