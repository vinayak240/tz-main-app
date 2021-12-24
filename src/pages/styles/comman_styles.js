import { makeStyles } from "@material-ui/core/styles";

const animationStyles = makeStyles((theme) => ({
  rippleEffect: {
    backgroundPosition: "center",
    transition: "background 0.8s",
    "&:hover": {
      background:
        "#47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%",
    },
    "&:active": {
      backgroundColor: "#6eb9f7",
      backgroundSize: "100%",
      transition: "background 0s",
    },
  },

  clickEffect: {
    "&:active": {
      boxShadow: "none",
      backgroundColor: "lightgray",
    },
  },
  shine: {
    backgroundRepeat: "no-repeat",
    animation: "$placeholderShimmer 3s infinite ease",
    background:
      "-webkit-gradient(linear,left top,right top,color-stop(0, rgb(235, 235, 235)),color-stop(0.4, rgb(235, 235, 235)),color-stop(0.5, white),color-stop(0.6, rgb(235, 235, 235)),color-stop(1, rgb(235, 235, 235)))",
  },
  "@keyframes placeholderShimmer": {
    "0%": {
      backgroundPosition: "-400px 0",
    },
    "100%": {
      backgroundPosition: "400px 0",
    },
  },
}));

export default animationStyles;
