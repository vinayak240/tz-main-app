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
import { getCorrespondingHexCode } from "../../order-details/utils/helper";

function TableAppBar(props) {
  const classes = useStyles();

  const getTableStatusText = (status) => {
    switch (status) {
      case "TABLE_REQUESTED":
        return "Requested";
      case "TABLE_ACTIVE":
        return "Active";
      case "TABLE_FREE":
        return "Free";
      case "TABLE_CHECKOUT_REQUESTED":
        return "Checkout Requested";
      case "TABLE_CHECKOUT_DONE":
        return "Checkout Done";
      default:
        return "None";
    }
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case "TABLE_REQUESTED":
        return "blue";
      case "TABLE_ACTIVE":
        return "green";
      case "TABLE_FREE":
        return "green";
      case "TABLE_CHECKOUT_REQUESTED":
        return "blue";
      case "TABLE_CHECKOUT_DONE":
        return "green";
      case "TABLE_ERROR":
        return "red";
      default:
        return "None";
    }
  };

  const goBack = (props) => {
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
          style={{
            boxShadow: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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
          <span
            style={{
              fontSize: "1rem",
              fontFamily: '"Proxima Nova"',
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                background: getCorrespondingHexCode(
                  getTableStatusColor(props.status)
                ),
                width: "0.7rem",
                height: "0.7rem",
                borderRadius: "50%",
                marginRight: "6px",
              }}
            ></div>
            {getTableStatusText(props?.status)}
          </span>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default TableAppBar;
