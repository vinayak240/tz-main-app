import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  itemList: {
    marginTop: "24px",
    paddingBottom: "4px",
    borderRadius: "0px",
    border: "none",
    boxShadow: "none",
  },
  suggestionTextBox: {
    flexBasis: "80%",
    fontSize: "0.9rem",
    width: "100%",
    padding: "14px 0",
    outline: 0,
    resize: "none",
    whiteSpace: "nowrap",
    overflow: "auto",
    caretColor: "#fc8019",
    fontWeight: 300,
    border: 0,
    fontFamily: "'Proxima Nova', sans-serif",
  },
  suggestionBox: {
    padding: " 0 16px 0 16px",
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
  },
  separatorLine: {
    backgroundColor: "#f4f4f5",
    height: "12px",
  },
  itemsMnText: {
    fontWeight: 500,
    padding: "0px 0px",
    margin: "14px 0px 14px 0px",
    fontSize: "1rem",
    fontFamily: "'Proxima Nova'",
  },
  offerIcon: {
    "&::before": {
      content: '"\\E946"',
    },
  },
  offerCtnr: {
    padding: "4px 10px",
    borderRadius: "0px",
    border: "none",
    boxShadow: "none",
    marginTop: "0px",
  },
  offerMnText: {
    margin: "6px",
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "'Proxima Nova'",
  },
  offerLtText: {
    margin: "6px",
    display: "flex",
    fontFamily: "'Proxima Nova'",
    alignItems: "center",
  },
  paymentsCtnr: {
    borderRadius: "0px",
    border: "none",
    boxShadow: "none",
    marginTop: "0px",
    marginTop: "0px",
    marginBottom: "25px",
    padding: "4px 10px",
  },
  paymentItemCtnr: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px",
    fontSize: "14px",
    fontWeight: 300,
    fontFamily: "Proxima Nova",
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
});

export default useStyles;
