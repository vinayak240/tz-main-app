import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    borderTop: "1px solid lightgray",
  },
  icons: {
    width: "1.75rem",
  },
  nav_label: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    transition: "margin 1s ease",
  },
  selected: {
    color: "#282c34",
  },
});

const BottomNavbar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("menu");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // props.setPage(value)
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        classes={{
          selected: classes.selected,
        }}
        style={{
          borderTop: value === "menu" ? "1.2px solid black" : "none",
        }}
        label={
          <span
            style={{
              marginTop: value !== "menu" ? "1.5px" : "5px",
            }}
            className={classes.nav_label}
          >
            Menu
          </span>
        }
        value="menu"
        icon={
          <ListAltRoundedIcon
            style={{ color: value !== "menu" ? "gray" : "#282c34" }}
          />
        }
      />
      <BottomNavigationAction
        classes={{
          selected: classes.selected,
        }}
        style={{
          borderTop: value === "cart" ? "1.2px solid black" : "none",
        }}
        label={
          <span
            style={{
              marginTop: value !== "cart" ? "1.5px" : "5px",
            }}
            className={classes.nav_label}
          >
            Cart
          </span>
        }
        value="cart"
        icon={
          <LocalMallOutlinedIcon
            style={{ color: value !== "cart" ? "gray" : "#282c34" }}
          />
        }
      />
      <BottomNavigationAction
        classes={{
          selected: classes.selected,
        }}
        style={{
          borderTop: value === "orders" ? "1.2px solid black" : "none",
        }}
        label={
          <span
            style={{
              marginTop: value !== "orders" ? "1.5px" : "5px",
            }}
            className={classes.nav_label}
          >
            Orders
          </span>
        }
        value="orders"
        icon={
          <EventNoteOutlinedIcon
            style={{ color: value !== "orders" ? "gray" : "#282c34" }}
          />
        }
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
