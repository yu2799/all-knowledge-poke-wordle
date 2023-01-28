import { FC, useCallback, useState, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/HelpOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
import { InfoDialog } from "./InfoDialog";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export const Header: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClick = useCallback((): void => setOpen((prev) => !prev), []);

  return (
    <AppBar position="static">
      <Toolbar>
        <CatchingPokemonIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 1 }}>
          Pokemon Wordle
        </Typography>
        <IconButton color="inherit" onClick={handleClick}>
          <HelpIcon />
        </IconButton>
        {/* <IconButton color="inherit">
          <SettingsIcon />
        </IconButton> */}
      </Toolbar>
      <InfoDialog open={open} onClose={handleClick} />
    </AppBar>
  );
};
