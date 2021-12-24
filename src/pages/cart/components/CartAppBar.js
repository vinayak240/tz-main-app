import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useStyles from "../styles/app_bar";
import BackIcon from "../../menu/assets/BackIcon";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import OptionsMenu from "./OptionsMenu";

function CartAppBar(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    anchorEl: null,
  });

  const handleMenuOpen = (evt) => {
    setState({
      ...state,
      anchorEl: evt.currentTarget,
    });
  };

  const handleMenuClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  return (
    <React.Fragment>
      <div className="partials">
        <Popover
          id={Boolean(state.anchorEl) ? "options-cart-popover" : undefined}
          style={{ paddingRight: "15px" }}
          open={Boolean(state.anchorEl)}
          onClose={handleMenuClose}
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <OptionsMenu />
        </Popover>
      </div>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="transparent"
        style={{ zIndex: 10 }}
        id="cart-app-bar"
        elevation={0}
      >
        <Toolbar id="cart-tool-bar" className={classes.appBarRoot}>
          <IconButton
            onClick={props.goBack}
            style={{ padding: "16px" }}
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
          <div style={{ marginLeft: "8px" }}>
            <Typography className={classes.abrMainText} noWrap>
              Table #12
            </Typography>
            <Typography className={classes.abrLightText} noWrap>
              {props.n_items} Items | ETA 35mins
            </Typography>
          </div>
          <IconButton
            onClick={handleMenuOpen}
            aria-describedby={
              Boolean(state.anchorEl) ? "options-cart-popover" : undefined
            }
            style={{ marginLeft: "auto", marginRight: "-16px" }}
          >
            <MoreVertRoundedIcon htmlColor="black" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default CartAppBar;
