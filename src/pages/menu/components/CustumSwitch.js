import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 36,
    height: 24,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "rgb(58, 183, 87)",
        borderColor: "rgb(58, 183, 87)",
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function CustumSwitch(props) {
  const { isChecked, setChecked, switchLabel } = props;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <AntSwitch
          checked={isChecked}
          onChange={handleChange}
          name="checkedSwitch"
        />
      }
      label={
        <span style={{ color: "#3d4152", margin: "7px" }}>{switchLabel}</span>
      }
    />
  );
}
