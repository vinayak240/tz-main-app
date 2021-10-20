import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    backgroundColor: "#21242b",
  },
  appBarOptions: {
    width: "fit-content",
    marginLeft: "auto",
  },
  notifBell: {
    width: "fit-content",
    minWidth: "1rem",
    color: "white",
    borderRadius: "4px",
    marginRight: "20px",
    padding: "0px",
    "&:hover": {
      opacity: 0.8,
    },
  },
  hamMenu: {
    width: "fit-content",
    minWidth: "1rem",
    color: "white",
    borderRadius: "4px",
    padding: "3px",
    "&:hover": {
      opacity: 0.8,
    },
  },
  optMenuItem: {
    paddingRight: "15px",
  },
}));

export default useStyles;
