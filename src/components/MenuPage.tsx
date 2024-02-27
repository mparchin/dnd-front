import { useBgColor, usePrimaryColor } from "../theme";
import {
  AutoStories,
  Settings,
  School,
  MilitaryTech,
  Accessible,
  Gavel,
  Description,
  People,
  ChildFriendly,
} from "@mui/icons-material";
import NavigationItem from "./navigation/NavigationItem";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const primaryColor = usePrimaryColor();
  const bgColor = useBgColor();
  return (
    <div className="flex w-full h-full flex-row flex-wrap justify-evenly content-start pt-1">
      <NavigationItem
        label="Spells"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/spells")}
        icon={AutoStories}
      />
      <NavigationItem
        label="Classes"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/classes")}
        icon={School}
      />
      <NavigationItem
        label="Characters"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/characters")}
        icon={Description}
      />
      <NavigationItem
        label="Feats"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/feats")}
        icon={MilitaryTech}
      />
      <NavigationItem
        label="Races"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/races")}
        icon={People}
      />
      <NavigationItem
        label="Backgrounds"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/backgrounds")}
        icon={ChildFriendly}
      />
      <NavigationItem
        label="Conditions"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/conditions")}
        icon={Accessible}
      />
      <NavigationItem
        label="Rules"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/rules")}
        icon={Gavel}
      />
      <NavigationItem
        label="Settings"
        color={primaryColor.main}
        bgColor={bgColor}
        onClick={() => navigate("/settings")}
        icon={Settings}
      />
    </div>
  );
}
