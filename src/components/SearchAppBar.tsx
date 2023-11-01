import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  // useTheme,
} from "@mui/material";
import { MaterialUISwitch } from "./MaterialUISwitch";
import { useThemeStore } from "../theme";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "./FilterDialog";

export default function SearchAppBar() {
  const navigate = useNavigate();
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const filter = useFilterStore((state) => state);
  return (
    <>
      <Box className="flex-grow">
        <AppBar position="sticky" className="">
          <Toolbar className="">
            <MaterialUISwitch color="primary" onChange={() => toggleMode()} />
            <TextField
              id="search"
              variant="filled"
              color="secondary"
              className="flex-grow"
              size="small"
              maxRows={1}
              value={filter.searchString ? filter.searchString : ""}
              onChange={(e) => filter.setSearchString(e.target.value)}
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
                    {filter.searchString ? (
                      <IconButton
                        onClick={() => filter.setSearchString(undefined)}
                      >
                        <ClearIcon className="align-top p-0" />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <SearchIcon className="align-top p-0" />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="block ml-4"
              onClick={() => navigate("filter")}
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
