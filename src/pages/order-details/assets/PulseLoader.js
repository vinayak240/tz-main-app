import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  pulseLoader: {
    display: "inline-block",
    borderRadius: "50%",
    backgroundColor: "rgb(50, 139, 214)",
    outline: "1px solid transparent",
    animation: `$pulseanim 1s ${theme.transitions.easing.easeInOut} infinite`,
  },
  "@keyframes pulseanim": {
    "50%": {
      transform: "scale(0.4)",
      opacity: 0.5,
    },
    "50%": {
      transform: "scale(0.4)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(0.8)",
      opacity: 0.5,
    },
  },
}));

export default function PulseLoader(props) {
  const classes = useStyles();
  return <div className={classes.pulseLoader} {...props}></div>;
}
