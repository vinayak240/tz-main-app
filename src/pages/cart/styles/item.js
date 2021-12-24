import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemName: {
    margin: "0px 5px",
    lineHeight: "1.4rem",
    textOoverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    maxHeight: "3rem",
    fontSize: "15px",
    paddingTop: "4px",
    overflow: "hidden",
    fontFamily: "'Proxima Nova'",
    fontWeight: 300,
  },
  addSubBtnCtnr: {
    width: "96%",
    display: "flex",
    justifyContent: "space-around",
    height: "28px",
    background: "#fff",
    border: "1px solid #e9e9eb",
    fontSize: ".86rem",
    color: "#7e808c",
    contain: "content",
    alignItems: "center",
  },
  itemPrice: {
    color: "#3d4152",
    fontSize: ".86rem",
    paddingTop: "6px",
    fontWeight: 400,
  },
  repeatBtn: {
    width: "calc(50% - 4%)",
    border: "2px solid #ffa400",
    height: "42px",
    lineHeight: "38px",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    textTransform: "uppercase",
    fontWeight: 600,
    display: "flex",
    fontSize: "0.83rem",
  },
}));

export default useStyles;
