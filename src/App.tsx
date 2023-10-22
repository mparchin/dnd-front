import { ThemeMode, useThemeStore } from "./theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";

export default function App() {
  const mode = useThemeStore((state) => state.mode);
  return (
    <>
      <div className="flex-col flex w-screen h-screen max-h-screen overflow-hidden">
        <div className="flex-grow-0 flex flex-shrink basis-auto">
          <SearchAppBar></SearchAppBar>
        </div>
        {/* <IconButton
        onClick={() => toggleMode()}
        color="secondary"
        className="block md:hidden"
      >
        {mode == ThemeMode.dark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> */}
        <div className="flex-grow flex flex-shrink basis-auto overflow-auto">
          <SpellList></SpellList>
        </div>

        <div className="flex-grow-0 flex flex-shrink basis-1"></div>
      </div>

      <SpellDetailDialog />
    </>
  );
}
