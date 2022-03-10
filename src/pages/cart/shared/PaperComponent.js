import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function PaperComponent(props) {
  return (
    <Paper
      style={{
        padding: "12px",
        borderRadius: "12px",
        minWidth: "260px",
      }}
      {...props}
    />
  );
}
