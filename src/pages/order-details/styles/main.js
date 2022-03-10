import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paymentsCtnr: {
    borderRadius: "0px",
    border: "none",
    boxShadow: "none",
    marginTop: "0px",
    marginBottom: "25px",
    padding: "4px 10px",
  },
  paymentItemCtnr: {
    display: "flex",
    fontSize: "0.86rem",
    fontFamily: "Proxima Nova",
    fontWeight: "400",
    justifyContent: "space-between",
  },
  paymentItem: {
    margin: "5px 0px",
  },
  borderedSeparator: {
    margin: "13px 0 10px",
    height: "1px",
    display: "block",
    background: "#f1f1f3",
  },
  totalMnText: {
    margin: "0px",
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "'Proxima Nova'",
  },
});

export default useStyles;
