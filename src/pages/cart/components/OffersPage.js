import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
  const [state, setState] = useState({
    coupon_code: "",
  });
  const [curState, setCurState] = useState(null);

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: String(evt.target.value).toLocaleUpperCase(),
    });
  };

  const applyCouponCode = () => {
    let offer = props.offers.find((o) => o.code === state.coupon_code);

    props.applyOffer(offer);

    setState({
      ...state,
      coupon_code: "",
    });
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
      window.location.pathname + "#offers"
    );
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  return (
    <div>
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
                  name="coupon_code"
                  value={state.coupon_code}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    width: "100%",
                    outline: "0",
                  }}
                  placeholder="Enter coupon code"
                />
              </div>
              <div>
                <Button
                  onClick={applyCouponCode}
                  style={{
                    padding: "0px",
                    minWidth: "0px",
                    // color: "rgb(252, 128, 25)",
                    color: "rgb(50 139 214)",
                    fontSize: "0.83rem",
                    fontWeight: "600",
                    fontFamily: "'Proxima Nova'",
                    opacity: state.coupon_code.length > 0 ? 1 : 0.64,
                  }}
                  disabled={state.coupon_code.length === 0}
                >
                  APPLY
                </Button>
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
            props.offers.map((offer) => (
              <Offer
                offer={offer}
                applyOffer={props.applyOffer}
                cart={props.cart}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
