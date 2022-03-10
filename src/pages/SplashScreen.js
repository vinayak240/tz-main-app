import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Logo from "../layouts/components/Logo";
import { Fade } from "@material-ui/core";

const TZLinearProgress = withStyles({
  root: {
    height: "6px",
  },
  barColorPrimary: {
    background: "rgb(33, 36, 43)",
  },
})(LinearProgress);

export default function SplashScreen() {
  const [state, setState] = useState({
    scale: 0,
  });
  useEffect(() => {
    setTimeout(
      () =>
        setState({
          ...state,
          scale: 1,
        }),
      300
    );
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#21242b",
        flexDirection: "column",
      }}
    >
      <div>
        <TZLinearProgress style={{ backgroundColor: "yellow" }} />
      </div>
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          scale: "0.5",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          willChange: "transform",
          transform: `scale(${state.scale})`,
        }}
      >
        <Logo width="10rem" height="5rem" />
      </div>
    </div>
  );
}