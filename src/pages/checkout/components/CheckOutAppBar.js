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

function CheckOutAppBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="transparent"
        style={{ zIndex: 10 }}
        id="cart-app-bar"
        elevation={0}
      >
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
          }}
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
          <div style={{ marginLeft: "8px" }}>
            <Typography className={classes.abrMainText} noWrap>
              Checkout - Table #{props.table_id}
            </Typography>
            <Typography className={classes.abrLightText} noWrap>
              {props.n_orders} Orders | <span>&#8377;</span> {props.total}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default CheckOutAppBar;
