import { Button, Card, useTheme } from "@mui/material";
import { getPrimaryColor, useThemeStore } from "../../theme";
import { useMemo } from "react";

interface ScrollerCardsProps {
  onClick: (divId: string) => void;
  divId: string;
  cardId: string;
  text: string;
  selected?: boolean;
}

export default function (props: ScrollerCardsProps) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const primaryColor = useMemo(() => getPrimaryColor(theme, themeStore), [
    theme,
    themeStore,
  ]);
  return (
    <Card
      elevation={3}
      className="mt-1 mr-1 shrink-0 h-fit"
      id={props.cardId}
      style={{ backgroundColor: props.selected ? primaryColor.main : "" }}
    >
      <Button
        color="inherit"
        className="p-2"
        onClick={() => props.onClick(props.divId)}
      >
        {props.text}
      </Button>
    </Card>
  );
}
