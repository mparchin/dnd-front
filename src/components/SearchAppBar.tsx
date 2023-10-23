import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Tune";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import { MaterialUISwitch } from "./MaterialUISwitch";
import { useThemeStore } from "../theme";
import { useSearchParamatersStore } from "./SpellList";

export default function SearchAppBar() {
  const theme = useTheme();
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const { setSearchString } = useSearchParamatersStore((state) => state);
  return (
    <>
      <Box className="flex-grow">
        <AppBar
          position="sticky"
          enableColorOnDark
          sx={{
            bgcolor: theme.palette.primary.main,
          }}
          className=""
        >
          <Toolbar className="">
            <MaterialUISwitch color="primary" onChange={() => toggleMode()} />
            <TextField
              id="search"
              variant="filled"
              color="secondary"
              className="flex-grow"
              size="small"
              maxRows={1}
              onChange={(e) => setSearchString(e.target.value)}
              sx={{
                "& .MuiFilledInput-input": {
                  padding: "10px 12px 12px 12px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    className="align-top mb-5 mr-0 pr-0"
                    sx={{
                      "& .MuiIconButton-root": {
                        paddingRight: 0,
                      },
                    }}
                  >
                    <IconButton>
                      <SearchIcon className="align-top p-0" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="block md:hidden ml-4"
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography
            variant="h6"
            noWrap
            component="div"
            className="flex-grow hidden md:block"
          >
            TEST
          </Typography> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
