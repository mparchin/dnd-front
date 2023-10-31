import { useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";

interface IFilterButtonText {
  text: string;
  checkCondition: boolean;
}

export default function (args: IFilterButtonText) {
  const theme = useTheme();
  return (
    <>
      <div className="flex-grow text-left">{args.text}</div>
      <div className="flex-shrink-0">
        {args.checkCondition ? (
          <Check
            style={{
              color:
                theme.palette.mode == "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
