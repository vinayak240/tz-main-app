import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    backgroundColor: "#ffffff",
    WebkitBoxShadow: "0 2px 2px rgb(40 44 63 / 10%)",
    boxShadow: "0 2px 2px rgb(40 44 63 / 10%)",
  },
  abrLightText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: "#7e808c",
    fontFamily: "'Proxima Nova'",
    fontSize: ".7rem",
  },
  abrMainText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: "#3d4152",
    fontSize: "0.95rem",
    fontFamily: "'Proxima Nova'",
    fontWeight: 600,
    marginTop: "4px",
  },
  abrTableNo: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: "#3d4152",
    fontSize: "1rem",
    fontWeight: 600,
    border: "1px solid lightgray",
    borderRadius: "5px",
    width: "fit-content",
    paddingLeft: "4px",
    paddingRight: "4px",
    background: "#fff6c3",
  },
}));

export default useStyles;
