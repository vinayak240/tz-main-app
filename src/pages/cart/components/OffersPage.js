import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import BackIcon from "../../menu/assets/BackIcon";
import Offer from "./Offer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
    color: "black",
    fontFamily: "'Proxima Nova'",
  },
}));

export default function OffersPage(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="sticky" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <BackIcon />
          </IconButton>
          <Typography
            style={{
              fontSize: "1.03rem",
              fontWeight: 500,
              fontFamily: "'Proxima Nova'",
              paddingLeft: "4px",
            }}
          >
            Apply Offers
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <div
          style={{
            background: "#f4f4f5",
            padding: "20px 16px 10px 16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "white",
                alignItems: "center",
                padding: "10px",
                WebkitBoxShadow: "0 1px 7px 0 rgb(40 44 63 / 7%)",
                boxShadow: "0 1px 7px 0 rgb(40 44 63 / 7%)",
                border: "solid 1px rgba(40,44,63,.18)",
                backgroundColor: "#fff",
                height: "38px",
              }}
            >
              <div
                style={{
                  width: "90%",
                }}
              >
                <input
                  style={{
                    border: "none",
                    width: "100%",
                    outline: "0",
                  }}
                  placeholder="Enter coupon code"
                />
              </div>
              <div
                style={{
                  color: "#fc8019",
                  textTransform: "uppercase",
                  fontWeight: "500",
                  fontFamily: "'Proxima Nova'",
                }}
              >
                Apply
              </div>
            </div>
          </div>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "0px",
              textTransform: "uppercase",
              color: "#535665",
              fontSize: ".75rem",
              fontWeight: "500",
              fontFamily: "'Proxima Nova'",
            }}
          >
            Available Offers
          </h2>
        </div>
        <div>
          {props.offers?.length > 0 &&
            props.offers.map((offer) => <Offer offer={offer} />)}
        </div>
      </div>
    </div>
  );
}
