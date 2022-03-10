import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, Dialog, IconButton, Paper } from "@material-ui/core";
import FoodSymbols from "../assets/FoodSymbols";
import BackIcon from "../assets/BackIcon";
import DialogTransition from "../shared/DialogTransition";
import Item from "./Item";
import CustumizationPage from "./CutumizationPage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#f2f6fc",
    color: "black",
  },
  dottedSeperator: {
    border: "none",
    borderBottom: "10px solid #ececec",
    width: "100%",
    margin: "20px auto 15px auto",
  },
}));

export default function PackageItemsPage(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    f_cust_dialog: false,
  });
  const [curState, setCurState] = useState(null);

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
    props.handleClose();
  };

  const goBack = (isPopped = false) => {
    if (!isPopped) {
      window.history.back();
    }

    props.handleClose();
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    goBack(true);
  };

  useEffect(() => {
    setCurState(window.history.state);
    window.history.pushState(
      window.history.state,
      null,
      window.location.pathname + "#package-items"
    );

    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  return (
    <div>
      <div className="partials">
        <Dialog
          fullScreen
          open={state.f_cust_dialog}
          onClose={() => handleDialogClose("f_cust_dialog")}
          TransitionComponent={DialogTransition}
        >
          <CustumizationPage
            item={props.m_package}
            handleClose={() => handleDialogClose("f_cust_dialog")}
            addItem={props.addItem}
            decideFoodType={props.decideFoodType}
            isPackage={true}
          />
        </Dialog>
      </div>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => goBack()}
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
          <Typography
            style={{
              fontSize: "1.12rem",
              fontWeight: 600,
              fontFamily: "Open Sans",
            }}
          >
            Package Items
          </Typography>
        </Toolbar>
        <Toolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FoodSymbols
              food_type={props.decideFoodType()}
              style={{
                width: "19px",
                height: "fit-content",
              }}
            />{" "}
            <span style={{ fontSize: "1.1rem", marginLeft: "5px" }}>
              {props.m_package.package_name}
            </span>{" "}
          </div>
        </Toolbar>
      </AppBar>
      <Paper
        style={{ padding: "15px", marginTop: "20px", marginBottom: "60px" }}
        elevation={0}
      >
        {props.m_package.items.map((ele, idx, arr) => (
          <div key={idx}>
            <div style={{ paddingBottom: "60pxpx" }}>
              {" "}
              <Item key={ele._id} item={ele} isPackage={true} />{" "}
            </div>
            {arr.length !== idx + 1 && (
              <hr
                style={{
                  borderWidth: "1.5px",
                  margin: "6px 0 20px 0",
                }}
                className={classes.dottedSeperator}
              ></hr>
            )}
          </div>
        ))}
      </Paper>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTop: "1px solid lightgrey",
          padding: "5px 10px",
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <Button
          onClick={
            Boolean(props.m_package.custumization_arr.length > 0)
              ? () => handleDialogOpen("f_cust_dialog")
              : () => {
                  goBack();
                  setTimeout(() => props.addItem(true), 10);
                }
          }
          style={{
            width: "90%",
            padding: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "6px",
            background: "rgb(255 215 34)",
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

PackageItemsPage.defaultProps = {
  isPackage: true,
};
