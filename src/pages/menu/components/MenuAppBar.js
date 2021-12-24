import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Logo from "../../../layouts/components/Logo";
import Slide from "@material-ui/core/Slide";
import useStyles from "../styles/app_bar";
import { Button, Popover, Typography } from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import NotificationsPausedRoundedIcon from "@material-ui/icons/NotificationsPausedRounded";
import OptionsMenu from "./OptionsMenu";
import MenuSearchBar from "./MenuSearchBar";
import MenuTabs from "./MenuTabs";

const HideOnScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const MenuAppBar = (props) => {
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
      <CssBaseline />
      <AppBar
        color="transparent"
        style={{ zIndex: 10 }}
        id="menu-app-bar"
        elevation={0}
      >
        <Toolbar id="menu-tool-bar" className={classes.appBarRoot}>
          <Typography variant="h6" noWrap>
            <Logo width="100px" height="50px" />
          </Typography>
          <div className={classes.appBarOptions}>
            <Button
              style={{
                width: "fit-content",
                minWidth: "1rem",
                color: "white",
                borderRadius: "4px",
                marginRight: "20px",
                padding: "0px",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <NotificationsPausedRoundedIcon />
            </Button>

            <Button
              onClick={handleMenuOpen}
              aria-describedby={
                Boolean(state.anchorEl) ? "options-menu-popover" : undefined
              }
              style={{
                backgroundColor: "#5A5F73",
                width: "fit-content",
                minWidth: "1rem",
                color: "white",
                borderRadius: "4px",
                padding: "3px",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <MenuRoundedIcon />
            </Button>

            <Popover
              id={Boolean(state.anchorEl) ? "options-menu-popover" : undefined}
              style={{ paddingRight: "15px" }}
              open={Boolean(state.anchorEl)}
              onClose={handleMenuClose}
              anchorEl={state.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
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
        </Toolbar>

        {props.isAtTop && (
          <>
            <MenuTabs
              numTabs={3}
              tabValue={props.tabValue}
              setTabValue={props.setTabValue}
            />
            <MenuSearchBar
              isVegOnly={props.isVegOnly}
              setVegOnly={props.setVegOnly}
              isAtTop={props.isAtTop}
              menu={props.menu}
            />
          </>
        )}
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default MenuAppBar;
