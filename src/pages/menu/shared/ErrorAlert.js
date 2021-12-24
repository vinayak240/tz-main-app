import { Slide } from "@material-ui/core";
import React from "react";

function ErrorAlert(props) {
  const { alert } = props;
  return (
    <Slide in={true} direction="up">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          background: "#5e1414",
          color: "white",
          padding: "4px 7px",
          position: "fixed",
          width: "100%",
          bottom: 0,
          zIndex: 50,
        }}
      >
        <i
          style={{ marginLeft: "3px" }}
          className="fas fa-exclamation-circle"
        ></i>
        <p style={{ margin: "5px", paddingLeft: "7px" }}>{alert.msg}</p>
      </div>
    </Slide>
  );
}

export default ErrorAlert;
