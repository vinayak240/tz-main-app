import React from "react";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useStyles from "../../cart/styles/app_bar";
import BackIcon from "../../menu/assets/BackIcon";

function TableAppBar() {
  const classes = useStyles();

  const goBack = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="transparent"
        style={{ boxShadow: "none", position: "absolute", top: "0px" }}
        id="table-app-bar"
        elevation={0}
      >
        <Toolbar
          style={{ boxShadow: "none", background: "transparent" }}
          id="table-tool-bar"
          className={classes.appBarRoot}
        >
          <IconButton
            onClick={goBack}
            style={{ padding: "16px" }}
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default TableAppBar;
