import { makeStyles, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const useStyles = makeStyles(() => ({
  focusBorder: {
    outline: "none",
    "&:focus": {
      outline: "2px solid black",
    },
  },
}));

export default function PasscodeDrawer(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    digits: ["", "", "", ""],
  });

  const handleChange = (evt) => {
    let resIdx = Number(evt.target.id);
    let arr = [...state.digits];

    arr = arr.map((e, idx) => {
      if (idx === resIdx) {
        return evt.target.value === "" || isNaN(evt.target.value)
          ? ""
          : Number(evt.target.value);
      }
      return e;
    });

    setState({
      ...state,
      digits: [...arr],
    });

    if (evt.target.value?.length > 0 && evt.target?.nextSibling && resIdx < 3) {
      evt.target.nextSibling.focus();
    }
  };
  const handleKeyDown = (evt) => {
    let resIdx = Number(evt.target.id);
    let oldArr = [...state.digits];

    if (
      evt.target?.previousSibling &&
      !Boolean(oldArr[resIdx]) &&
      resIdx > 0 &&
      (evt.which == 8 || evt.which == 46)
    ) {
      evt.target.previousSibling.focus();
    }
  };

  useEffect(() => {
    let inp1 = document.getElementById("0");
    inp1.focus();
  }, []);

  const request = () => {
    props.request(state.digits.join(""));
  };

  return (
    <div style={{ minHeight: "19rem" }}>
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "'Proxima Nova'",
          fontSize: "1.2rem",
          margin: "12px",
        }}
      >
        Enter Passcode
      </Typography>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "18px",
          }}
        >
          <input
            className={classes.focusBorder}
            id="0"
            style={{
              width: "2rem",
              padding: "15px 10px",
              textAlign: "center",
              border: "none",
              background: "#ececec",
              fontSize: "1.1rem",
              fontWeight: "500",
              borderRadius: "8px",
              opacity: "0.8",
              fontFamily: "'Proxima Nova'",
              margin: "10px 0.85rem",
            }}
            type="text"
            maxLength={1}
            value={state.digits[0]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            className={classes.focusBorder}
            id="1"
            style={{
              width: "2rem",
              padding: "15px 10px",
              textAlign: "center",
              border: "none",
              background: "#ececec",
              fontSize: "1.1rem",
              fontWeight: "500",
              borderRadius: "8px",
              opacity: "0.8",
              fontFamily: "'Proxima Nova'",
              margin: "10px 0.85rem",
            }}
            type="text"
            maxLength={1}
            value={state.digits[1]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            className={classes.focusBorder}
            id="2"
            style={{
              width: "2rem",
              padding: "15px 10px",
              textAlign: "center",
              border: "none",
              background: "#ececec",
              fontSize: "1.1rem",
              fontWeight: "500",
              borderRadius: "8px",
              opacity: "0.8",
              fontFamily: "'Proxima Nova'",
              margin: "10px 0.85rem",
            }}
            type="text"
            maxLength={1}
            value={state.digits[2]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input
            className={classes.focusBorder}
            id="3"
            style={{
              width: "2rem",
              padding: "15px 10px",
              textAlign: "center",
              border: "none",
              background: "#ececec",
              fontSize: "1.1rem",
              fontWeight: "500",
              borderRadius: "8px",
              opacity: "0.8",
              fontFamily: "'Proxima Nova'",
              margin: "10px 0.85rem",
            }}
            type="text"
            maxLength={1}
            value={state.digits[3]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Alert
            style={{ fontFamily: '"Proxima Nova"', margin: "20px" }}
            severity="info"
          >
            You can find Table Passcode from <br></br>{" "}
            <span>
              <strong>
                <span
                // style={{
                //   backgroundColor: "#5A5F73",
                //   width: "fit-content",
                //   minWidth: "1rem",
                //   color: "white",
                //   borderRadius: "4px",
                //   padding: "3px",
                //   marginRight: "2px",
                //   "&:hover": {
                //     opacity: 0.8,
                //   },
                // }}
                >
                  {" "}
                  <MenuRoundedIcon
                    style={{ verticalAlign: "middle", fontSize: "1.25rem" }}
                  />
                </span>
                /Your Table
              </strong>
            </span>
          </Alert>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={request}
            style={{
              color: "white",
              background: "#282c34",
              fontSize: "1rem",
              fontWeight: "bold",
              fontFamily: "'Proxima Nova'",
              width: "90%",
              opacity: state.digits.every((d) => d !== "" && !isNaN(d))
                ? 1
                : 0.7,
            }}
            disabled={!state.digits.every((d) => d !== "" && !isNaN(d))}
          >
            Request
          </Button>
        </div>
      </div>
    </div>
  );
}
