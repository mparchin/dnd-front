import { Button, Card } from "@mui/material";
import { usePrimaryColor } from "../../theme";
import { useMemo } from "react";

interface ScrollerCardsProps {
  onClick: (divId: string) => void;
  divId: string;
  cardId: string;
  text: string;
  selected?: boolean;
}

export default function (props: ScrollerCardsProps) {
  const primaryColor = usePrimaryColor();
  const bgColor = useMemo(
    () => ({ backgroundColor: props.selected ? primaryColor.main : "" }),
    [props.selected, primaryColor]
  );
  return (
    <Card
      elevation={3}
      className="mt-1 mb-1 mr-1 shrink-0"
      id={props.cardId}
      style={bgColor}
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
