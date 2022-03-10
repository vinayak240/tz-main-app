import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Popover,
  Toolbar,
} from "@material-ui/core";
import useStyles from "../../cart/styles/app_bar";
import BackIcon from "../../menu/assets/BackIcon";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import OptionsMenu from "./OptionsMenu";

function OrdersAppBar(props) {
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
          id={Boolean(state.anchorEl) ? "options-orders-popover" : undefined}
          open={Boolean(state.anchorEl)}
          onClose={handleMenuClose}
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
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
        <Toolbar
          style={{ justifyContent: "space-between" }}
          id="cart-tool-bar"
          className={classes.appBarRoot}
        >
          <IconButton
            onClick={props.goBack}
            style={{ padding: "16px" }}
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
          <div
            onClick={handleMenuOpen}
            style={{
              marginLeft: "3px",
              fontFamily: "'Proxima Nova'",
              fontSize: "0.95rem",
              fontWeight: "500",
              display: "flex",
              cursor: "pointer",
            }}
          >
            Your Orders{" "}
            {Boolean(state.anchorEl) ? (
              <ExpandLessRoundedIcon />
            ) : (
              <ExpandMoreRoundedIcon />
            )}
          </div>
          <IconButton //Dummy Btn
            style={{ padding: "16px", visibility: "hidden" }}
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

export default OrdersAppBar;
