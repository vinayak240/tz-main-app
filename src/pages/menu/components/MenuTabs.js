import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/styles";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
    disableRipple: true,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const MyTabs = withStyles({
  indicator: {
    backgroundColor: " #282c3f",
    height: "3px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "5px",
  },
})(Tabs);

const MyTab = withStyles({
  root: {
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "capitalize",
    color: "#282c3f",
    opacity: "0.6",
    fontFamily: "'Proxima Nova'",
  },
  selected: {
    color: "rgba(0, 0, 0, 0.87)",
    opacity: 1,
  },
})(Tab);

export default function MenuTabs(props) {
  const classes = useStyles();
  const { tabValue, setTabValue } = props;

  const handleChange = (evt, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div id="menu-tabs" className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#f1f1f6" }}
        elevation={0}
      >
        <MyTabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs menu"
          centered={props.numTabs < 3}
        >
          <MyTab label={<span>{"Food Menu"}</span>} {...a11yProps(0)} />
          <MyTab label={<span>{"Bar Menu"}</span>} {...a11yProps(1)} />
          <MyTab label={<span>{"Buffet Menu"}</span>} {...a11yProps(2)} />
        </MyTabs>
      </AppBar>
    </div>
  );
}
