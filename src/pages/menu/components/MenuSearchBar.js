import { Dialog, Paper, Toolbar, Typography } from "@material-ui/core";
import { useState } from "react";
import DialogTransition from "../shared/DialogTransition";
import useStyles from "../styles/main";
import CustumSwitch from "./CustumSwitch";
import MenuSearchPage from "./MenuSearchPage";

const MenuSearchBar = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    f_search_dialog: false,
  });

  const { isVegOnly, setVegOnly, isAtTop } = props;

  const handleDialogOpen = (flagName) => {
    setState({
      ...state,
      [flagName]: true,
    });
  };

  const handleDialogClose = (flagName) => {
    setState({
      ...state,
      [flagName]: false,
    });
  };

  return (
    <div>
      <div className="partials">
        <Dialog
          fullScreen
          open={state.f_search_dialog}
          onClose={() => handleDialogClose("f_search_dialog")}
          TransitionComponent={DialogTransition}
        >
          <MenuSearchPage
            is_veg={isVegOnly}
            handleClose={() => handleDialogClose("f_search_dialog")}
            menu={props.menu}
          />
        </Dialog>
      </div>
      <Toolbar
        id="menu-search-bar"
        style={{
          backgroundColor: "white",
          color: "#3d4152",
          paddingTop: "5px",
          borderBottom: isAtTop ? "1px solid lightgray" : "none",
        }}
      >
        <Typography style={{ paddingLeft: "4px" }}>
          <CustumSwitch
            isChecked={isVegOnly}
            setChecked={setVegOnly}
            switchLabel="veg only"
          />
        </Typography>
        <Paper
          onClick={() => handleDialogOpen("f_search_dialog")}
          className={classes.searchBtn}
          elevation={0}
        >
          <img
            style={{ width: "26px", verticalAlign: "middle" }}
            alt="Search Icon"
            src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          />
        </Paper>
      </Toolbar>
    </div>
  );
};

export default MenuSearchBar;
