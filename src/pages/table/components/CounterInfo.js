import React from "react";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

function CounterInfo(props) {
  const action = () => {};

  return (
    <div
      onClick={action}
      style={{
        display: "flex",
        adisplay: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 10px",
        borderBottom: props.isLast ? "none" : "1px solid #b5b3b3",
      }}
    >
      <div
        style={{
          fontSize: "1.3rem",
          fontFamily: "'Proxima Nova'",
          fontWeight: "bold",
        }}
      >
        {props.infoLabel}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "1.3rem",
            fontFamily: '"Proxima Nova"',
            fontWeight: "bold",
            marginRight: "14px",
          }}
        >
          {props.isAmount && <span>&#8377;</span>}
          {props.infoCount}
        </span>{" "}
        {/* {props.infoAction && (
          <ArrowForwardIosRoundedIcon
            style={{ width: "1.1rem", height: "1.1rem" }}
          />
        )} */}
      </div>
    </div>
  );
}

export default CounterInfo;
