import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, setCartStatus } from "../../../redux/actions/cart";
import success_check from "../../../assets/success_check.json";
import wrong_wiggle from "../../../assets/wrong_wiggle.json";
import lottie from "lottie-web";
import CART_STATUS from "../../../enums/cart_status";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const useStyles = makeStyles(() => ({
  spinner: {
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    border: "16px solid rgba(40, 44, 52, 0.9)",
    borderTopColor: "#FCD601",
    animation: "$spin 1s linear infinite",
    margin: "10px auto",
  },
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

export default function LoadingDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const container = useRef(null);

  const handleClose = () => {
    props.onLoaderClose();
  };

  useEffect(() => {
    lottie.destroy();

    if (Boolean(props.is_finished)) {
      lottie.loadAnimation({
        container: container.current,
        animationData: success_check,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });

      setTimeout(() => {
        navigate("/restaurant/checkout/request");
      }, 2500);
    } else if (props.is_error) {
      lottie.loadAnimation({
        container: container.current,
        animationData: wrong_wiggle,
        renderer: "svg",
        loop: false,
        autoplay: true,
      });
    }
  }, [props.is_finished, props.is_error]);

  return (
    <div
      style={{ padding: props.is_finished || props.is_error ? "25px" : "10px" }}
    >
      {props.is_error && (
        <div style={{ position: "absolute", top: "5px", right: "13px" }}>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon />
          </IconButton>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "140px",
        }}
      >
        {props.is_finished || props.is_error ? (
          <div
            ref={container}
            style={
              props.is_finished
                ? { width: "130px", height: "130px" }
                : {
                    height: "19rem",
                    width: "19rem",
                    position: "absolute",
                    marginTop: "10px",
                  }
            }
          ></div>
        ) : (
          <div className={classes.spinner}></div>
        )}
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: "'Proxima Nova'",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}
        >
          {props.msg}
        </Typography>
      </div>
      {!props.is_finished && !props.is_error && Boolean(props.alert_msg) && (
        <div style={{ marginTop: "20px" }}>
          <Alert style={{ fontFamily: "'Proxima Nova'" }} severity="info">
            {props.alert_msg}
          </Alert>
        </div>
      )}
    </div>
  );
}
