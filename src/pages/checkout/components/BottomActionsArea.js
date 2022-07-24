import React from "react";
import { Button } from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { Alert, AlertTitle } from "@material-ui/lab";

export function BottomActionsArea(props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "white",
      }}
    >
      <div>
        {props.isOngoing ? (
          <div>
            <Alert style={{ fontFamily: "'Proxima Nova'" }} severity="warning">
              <AlertTitle>
                <strong>Some Orders Still On Going</strong>
              </AlertTitle>
              We Recommend to wait for them to finish or you can request for a
              checkout{" "}
            </Alert>
            <Button
              style={{
                display: "block",
                width: "95%",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontFamily: "'Proxima Nova'",
                fontWeight: "600",
                margin: "8px auto",
                borderRadius: "5px",
                background: "#fcd601",
                color: "black",
                display: "flex",
                padding: "9px",
                justifyContent: "space-between",
              }}
              // disabled={props.isOngoing}
              onClick={props.requestCheckout}
            >
              <div>
                {" "}
                Total: <span>&#8377;</span> {props.total}{" "}
              </div>
              <div>
                {" "}
                Check Out{" "}
                <PlayArrowRoundedIcon style={{ verticalAlign: "middle" }} />
              </div>
            </Button>
          </div>
        ) : (
          <Button
            style={{
              display: "block",
              width: "95%",
              textTransform: "capitalize",
              fontSize: "1rem",
              fontFamily: "'Proxima Nova'",
              fontWeight: "600",
              margin: "8px auto",
              borderRadius: "5px",
              background: "#fcd601",
              color: "black",
              display: "flex",
              padding: "9px",
              justifyContent: "space-between",
            }}
            onClick={props.requestCheckout}
          >
            <div>
              {" "}
              Total: <span>&#8377;</span> {props.total}{" "}
            </div>
            <div>
              {" "}
              Request CheckOut{" "}
              <PlayArrowRoundedIcon style={{ verticalAlign: "middle" }} />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
