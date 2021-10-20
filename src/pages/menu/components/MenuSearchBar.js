import { Paper, Toolbar, Typography } from "@material-ui/core";
import useStyles from "../styles/main";
import CustumSwitch from "./CustumSwitch";

const MenuSearchBar = (props) => {
  const classes = useStyles();
  const { isVegOnly, setVegOnly, isAtTop } = props;

  return (
    <Toolbar
      id="menu-search-bar"
      style={{
        backgroundColor: "white",
        color: "#3d4152",
        paddingTop: "5px",
        borderBottom: isAtTop ? "1px solid lightgray" : "none",
      }}
    >
      <Typography style={{ paddingLeft: "4px" }}>
        <CustumSwitch
          isChecked={isVegOnly}
          setChecked={setVegOnly}
          switchLabel="veg only"
        />
      </Typography>
      <Paper className={classes.searchBtn}>
        <img
          style={{ width: "26px", verticalAlign: "middle" }}
          alt="Search Icon"
          src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
        />
      </Paper>
    </Toolbar>
  );
};

export default MenuSearchBar;
