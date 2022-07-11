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

function NotificationAppBar() {
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
        style={{ zIndex: 10, background: "white" }}
        id="table-app-bar"
        elevation={0}
      >
        <Toolbar
          style={{
            boxShadow: "none",
            background: "transparent",
          }}
          id="notif-tool-bar"
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
          <Typography className={classes.abrMainText} noWrap>
            App Notifications
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NotificationAppBar;
