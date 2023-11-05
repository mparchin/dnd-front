import SearchAppBar from "./components/SearchAppBar";
import SpellList from "./components/SpellList";
import SpellDetailDialog from "./components/SpellDetailDialog";
import { GetAndSaveSpells } from "./api";
import FilterDialog from "./components/FilterDialog";
import ReloadPrompt from "./reloadPrompt";

export default function App() {
  return (
    <>
      <ReloadPrompt />
      <div className="flex-col flex w-screen h-screen max-h-screen overflow-hidden">
        <div className="flex-grow-0 flex flex-shrink basis-auto flex-col">
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

        <div className="flex-grow-0 flex flex-shrink basis-0"></div>
      </div>
      <SpellDetailDialog />
      <FilterDialog />
      <GetAndSaveSpells />
    </>
  );
}
