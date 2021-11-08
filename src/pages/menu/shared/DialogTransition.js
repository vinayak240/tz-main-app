import { Slide } from "@material-ui/core";
import React from "react";

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DialogTransition;
